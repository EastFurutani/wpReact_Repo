import React, {useState} from "react";

const Main = () => {
    const [words, setWords] = useState([])

    const [getId, setGetIdOnly] = useState([])
    const [getData, setGetData] = useState([])

    const [postText, setPostText] = useState([])
    const [postText2, setPostText2] = useState([])

    const [putId, setPutId] = useState([])
    const [putText, setPutText] = useState([])
    const [putText2, setPutText2] = useState([])

    const [deleteId, setDeleteId] = useState([])

    const GetEvent = () => {
        fetch("/word")
            .then(response => response.json())
            .then(data => {
                setWords(data)
            })
    }

    const GetIdOnlyEvent = () => {
        fetch("/word/" + getId, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setGetData(data)
            })
    }

    const PostEvent = () => {
        let postData = {
            wordName: postText,
            wordType: postText2
        }

        fetch("/word", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }

    const PutEvent = () => {
        let putData = {
            wordName: putText,
            wordType: putText2
        }

        fetch("/word/" + putId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
        })
    }

    const DeleteEvent = () => {
        fetch("/word/" + deleteId, {
            method: "DELETE"
        })
    }
    
    const wordsText = words.map((word) =>{
        return <div>
                    <p>{word.id}</p>
                    <p>{word.wordName}</p>
                    <p>{word.wordType}</p>
                </div>
    })
    
    return (
        <div>
            {wordsText}
            <input type="submit" value="Get" onClick={() => GetEvent()}></input>
            
            <br />
            <br />

            {getData.id}
            <br />
            {getData.wordName}
            <br />
            {getData.wordType}
            <br />
            <input value={getId} onChange={(e) => setGetIdOnly(e.target.value)}></input>
            <br />
            <input type="submit" value="GetId" onClick={() => GetIdOnlyEvent()}></input>


            <br />
            <br />

            <div>
                WordName:
                <input value={postText} onChange={(e) => setPostText(e.target.value)}></input>
                <br />
                WordType:
                <input value={postText2} onChange={(e) => setPostText2(e.target.value)}></input>
                <br />
                <input type="submit" value="Post" onClick={() => PostEvent()}></input>
            </div>

            <br />
            <br />

            <div>
                id:
                <input value={putId} onChange={(e) => setPutId(e.target.value)}></input>
                <br />
                WordName:
                <input value={putText} onChange={(e) => setPutText(e.target.value)}></input>
                <br />
                WordType:
                <input value={putText2} onChange={(e) => setPutText2(e.target.value)}></input>
                <br />
                <input type="submit" value="Put" onClick={() => PutEvent()}></input>
            </div>
            
            <br />
            <br />

            <div>
                <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)}></input>
                <br />
                <input type="submit" value="Delete" onClick={() => DeleteEvent()}></input>
            </div>
        </div>
    )
}

export default Main;