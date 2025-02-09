"use client";
import { Book, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

interface HeaderProps {
    reservationsCount: number
}

export default function Header({ reservationsCount }: HeaderProps) {
    const { user } = useContext(AuthContext);
    const router = useRouter()
console.log(user,"sds")
    return (
        <header className="sticky top-0 border-b z-20 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">Owais</span>
                </div>



                <div className="flex items-center gap-2 sm:gap-4">
                    {user ? (
                        <>
                            {user.role === "admin" ? (
                                <Button
                                    onClick={() => router.push("/dashboard")}
                                    variant="outline"
                                    size="sm"
                                    className="relative bg-gray-100 hover:bg-gray-200 text-black"
                                >
                                    <Book className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="hidden sm:inline">Admin panel</span>
                                    <span className="sm:hidden">Admin panel</span>
                                </Button>
                            ) : null
                            }
                            <Button
                                onClick={() => router.push("/reservations")}
                                variant="outline"
                                size="sm"
                                className="relative bg-gray-100 hover:bg-gray-200 text-black"
                            >
                                <Book className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="hidden sm:inline">My Reservations</span>
                                <span className="sm:hidden">Reservations</span>
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                                    {reservationsCount}
                                </span>
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    router.push("/")
                                }}
                                size="sm"
                                className="hidden sm:flex bg-white hover:bg-gray-100 text-black"
                            >
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="default" size="sm" className="hidden sm:flex" onClick={() => router.push("/login")}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}

