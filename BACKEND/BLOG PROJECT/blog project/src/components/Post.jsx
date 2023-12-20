import axios from "axios";

export default function Post() {
        axios.get("http://localhost:5000",  (req,res)=>{
            console.log(res);
        })
 


        return(
        <div className="postbox">
            <div className="postuser">
                <img className="postuserimg" src="" alt="" />
                <h1 className="postusername"></h1>
            </div>
            <div className="posttext">
                <p></p>
            </div>
        </div>

)
}
