import "./Main.css"
import Post from "./Post"

export default function MainContent(){
    return(
        <>
            <main>
                <div id="form">
                    <form action="/register" method="post">
                        <input type="text" name="post" placeholder="What are you thinking?" id="post" />
                        <input type="submit" value="Send" />
                    </form>
                </div>
                <div className="postroot">
                <Post />
                </div>
            </main>
        </>
    )
}