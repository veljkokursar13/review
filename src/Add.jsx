import React from 'react'
import { useState } from 'react'
import placeholder from './assets/placeholder.svg'
const Add = ({ onAddReview }) => {
const [name, setName] = useState('')
const [job, setJob] = useState('')
const [text, setText] = useState('')

const handleSubmit = (e) => {
    e.preventDefault()
    if (name && job && text) {
        onAddReview({ name, job, text })
        // Reset form
        setName('')
        setJob('')
        setText('')
        setImage({placeholder:'./assets/placeholder.svg'})
    }
}

  return (
    <form className='add-review' onSubmit={handleSubmit}>
        <h4>Add Review</h4>
        <div className='form-row'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-row'>
            <label htmlFor='job'>Job</label>
            <input type='text' id='job' name='job' value={job} onChange={(e) => setJob(e.target.value)} />
        </div>
        <div className='form-row'>
            <label htmlFor='text'>Text</label>
            <textarea 
                id='text' 
                name='text' 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder='Enter your review text here...'
                rows='4'
            />
        </div>
        <button type='submit' className='btn btn-submit'>Submit</button>
    </form>
  )
}

export default Add