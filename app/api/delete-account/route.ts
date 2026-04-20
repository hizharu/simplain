import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Admin client needed to delete auth user
    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Delete user data first (cascade should handle most, but be explicit)
    await adminSupabase.from("explain_favorites").delete().eq("user_id", user.id)
    await adminSupabase.from("quiz_attempts").delete().eq("user_id", user.id)
    await adminSupabase.from("profiles").delete().eq("id", user.id)

    // Delete avatar from storage if exists
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single()

    if (profile?.avatar_url?.includes("avatars/")) {
      const path = profile.avatar_url.split("avatars/")[1]
      if (path) await adminSupabase.storage.from("avatars").remove([path])
    }

    // Delete the auth user — this is irreversible
    const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(user.id)
    if (deleteError) throw deleteError

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete account error:", err)
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  }
}