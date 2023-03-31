import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'


const Dashbaord = () => {
    const { status } = useSession();

    if (status === "authenticated") {
        return (
            <div>
                <div>
                    Dashbaord
                </div>
                <div>
                    <button onClick={() => signOut({ callbackUrl: '/auth/signin' })}> Sign out </button>
                </div>
            </div>
        )
    }
    return <Link href="/api/auth/signin">Sign in</Link>
}

export default Dashbaord;