import Link from "next/link";

const Navbar = () => {
    return (
        <header className="border-primary-text/20 flex items-center justify-between border-b-[1.2px] py-4">
            <h2 className="text-2xl font-semibold tracking-tight uppercase">
                Dashboard
            </h2>

            <div className="flex items-center gap-4 text-lg font-medium">
                <Link href={"#"}>Profile</Link>
                <Link href="dashboard/messages/abc">Messages</Link>
                <Link href={"#"}>Notifications</Link>
                <Link href={"#"}>Courses</Link>

                <span className="bg-primary-text block size-10 rounded-full"></span>
            </div>
        </header>
    );
};

export default Navbar;
