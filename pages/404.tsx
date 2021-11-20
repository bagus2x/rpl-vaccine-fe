import type {NextPage} from 'next'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'



const NotFound: NextPage = () => {

    useEffect(() => {
        try {
            const data = jwtDecode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
            console.log(data)
        }catch(e: any) {
            console.log(e)
        }
    }, [])

    return (
        <div>
            hai
        </div>
    )
}

export default NotFound
