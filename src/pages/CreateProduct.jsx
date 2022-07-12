import React from 'react'
import HeaderAdmin from '../components/Administration/HeaderAdmin'
import BodyAdmin from '../components/Administration/BodyAdmin'
import "./styles/createProduct.css"
function CreateProduct() {



  return (
    <main>
    <HeaderAdmin />
    <section className='section-createProduct'>
    <BodyAdmin />
    </section>
    </main>
  )
}

export default CreateProduct