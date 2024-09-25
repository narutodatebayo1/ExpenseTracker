import BackNavbar from "@/component/backNavbar";


export default function Page() {
    return (
        <>
            <BackNavbar text="Help Center" route="/profile" />
            <div className="page-with-navbar-backnavbar">Help Center</div>
        </>
    )
}