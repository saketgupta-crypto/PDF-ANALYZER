import ReactMarkdown from "react-markdown";
function Answer({answer,error,isLoading}){
    return(
        <section className="card">
            <h2>Answer</h2>

            {isLoading && <p className="loading">Loading....</p>}

            {error && <p className="status error">{error}</p>}

            {!isLoading && !error && answer &&(
                // <div className="answer-box">
                //     <p>{answer}</p>
                // </div>
            <div className="answer-box">
                <ReactMarkdown>
                    {answer}
                </ReactMarkdown>
            </div>
            )}
            {!isLoading && !error && !answer &&(
                <p className="hint">Your answer will appear here after you ask a question.</p>
            )}
        </section>
    )
}

export default Answer;