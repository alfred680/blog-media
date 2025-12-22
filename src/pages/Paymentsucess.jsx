import React, { useEffect } from 'react'
import { activepremiemAPI } from '../server/Allapi'

function Paymentsucess() {

  useEffect(() => {
    const activatePremium = async () => {
      const token = sessionStorage.getItem("token")

      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`
        }

        try {
          await activepremiemAPI(reqHeader)
          alert("Premium Activated")
        } catch (err) {
          console.error(err)
          alert("Failed to activate premium")
        }
      }
    }

    activatePremium()
  }, [])

  return (
    <div>
      <img style={{height:"600px",marginLeft:"460px"}} src="https://smartfoodsafe.com/wp-content/uploads/2025/01/Payment.gif" alt="no image" />
      <h1 style={{textAlign:'center',fontSize:"40px",color:"green",marginTop:"-40px"}}><b>Payment Successfull</b></h1>
    </div>
  )
}

export default Paymentsucess
