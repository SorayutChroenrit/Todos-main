export const Login = ({setToken}) => {
    return (
    <div>
        <div style={{textAlign:'center'}}>User:</div>
        <input type="text"></input>
        <div style={{textAlign:'center'}}>Password</div>
        <input type="text"></input>
        <div>
        <button onClick={()=> setToken('123')}>Login</button>
        </div>
    </div>
    )
}