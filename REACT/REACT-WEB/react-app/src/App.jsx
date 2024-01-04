import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CreateNotes from "./CreateNotes.js"
import Notes from "./Notes.js"

export default function App(){
    return(
        <>
            <Header/>
            <CreateNotes 
                notes={Notes}
            />
            <Footer />
        </>
    )
}