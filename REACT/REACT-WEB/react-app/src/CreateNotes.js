
export default function CreateNotes(props){
    return(
        props.notes.map((note)=>{
            return(
            <div className='note'>
                <h1>{note.noteTitle}</h1>
                <p>{note.noteText}</p>
                <p>{note.id}</p>
            </div>
            )
        }
        )
    )
}