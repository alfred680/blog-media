import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

function Topauhoroption() {
    return (
        <div >
            <div className='fixed left-0 mt-2  top-0 h-screen w-[250px]'>
                <Sidebar />
            </div>
            <div>
                <div className="max-w-sm mx-auto mt-40 p-6 ml-160 shadow-lg rounded-xl bg-white">
                    <h2 className="text-2xl font-bold text-center mb-4"> Login</h2>

                    <form>

                        <label className="block mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Enter email"
                           
                        />

                        <label className="block mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Enter password"


                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                           <Link to={'/topauthor'}> Login</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Topauhoroption