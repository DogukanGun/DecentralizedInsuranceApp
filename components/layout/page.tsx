import { ReactNode } from "react"

type PageProps = {
    children: ReactNode
}
const Page = ({ children }: PageProps) => {
    return(
        <div className="min-h-screen w-full">
            {children}
        </div>
    )
}

export default Page;