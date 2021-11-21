import axios from 'axios'
import React from 'react'
import { ChangeEvent, useState } from 'react'

const Playground = () => {
  const [file, setFile] = useState<File | null>(null)
  // zmoazv0b

  const handleUpload = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) return
    const file = ev.target.files[0]
    setFile(file)
  }

  const handleSave = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'zmoazv0b')

    const res = await axios.post('https://api.cloudinary.com/v1_1/dzj27omy0/image/upload', formData)
    console.log(res.data)
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default Playground
