const dinamicallyYear = new Date().getFullYear()

export default function Footer(){
    return(
        <>
            <footer>
                <p>
                    {dinamicallyYear}
                </p>
            </footer>
        </>
    )
}