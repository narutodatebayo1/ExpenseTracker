import BackNavbar from "@/component/backNavbar";


export default function Page() {
    return (
        <>
            <BackNavbar text="Report" route="/profile" />
            <div className="page-with-navbar-backnavbar">Report</div>
        </>
    )
}