import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import notes from "./notes.js";

function CreateNotes(){
    return(
        notes.map((note)=>{
            return(
            <div className='note'>
                <h1>{note.noteTitle}</h1>
                <p>{note.noteText}</p>
            </div>
            )
        }
        )
    )
}


export default function App(){
    return(
        <>
            <Header/>
            <CreateNotes />
            <Footer />
        </>
    )
}