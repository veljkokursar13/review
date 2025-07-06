import React from 'react'
import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import data from './data'
import Add from './Add'

const Review = () => {
    const [reviews, setReviews] = useState([])
    const [index, setIndex] = useState(0)
    const [showAddForm, setShowAddForm] = useState(false)

    // Load reviews from localStorage on component mount
    useEffect(() => {
        const savedReviews = localStorage.getItem('reviews')
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews))
        } else {
            // If no saved reviews, use the default data
            setReviews(data)
            localStorage.setItem('reviews', JSON.stringify(data))
        }
    }, [])

    const {name, job, image, text} = reviews[index] || {}
    
    const checkNumber = (number) => {
        if (number > reviews.length - 1) {
            return 0
        }
        if (number < 0) {
            return reviews.length - 1
        }
        return number
    }
    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1
            return checkNumber(newIndex)
        })
    }
    const prevPerson = () => {
        setIndex((index) => {
            let newIndex = index - 1
            return checkNumber(newIndex)
        })
    }
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm)
    }
    const addReview = (newReview) => {
        const reviewToAdd = {
            id: reviews.length + 1,
            ...newReview,
            image: '/placeholder.svg' // Default placeholder image
        }
        const updatedReviews = [...reviews, reviewToAdd]
        setReviews(updatedReviews)
        // Save to localStorage
        localStorage.setItem('reviews', JSON.stringify(updatedReviews))
        setShowAddForm(false)
    }
  return (
    <main>
      <article className='review'>
        <div className='img-container'>
            <img src={image} alt={name} className='person-img' />
        </div>
        <h4 className='author'>{name}</h4>
        <p className='job'>{job}</p>
        <p className='info'>{text}</p>
        <button className='prev-btn' onClick={prevPerson}>
        <FaChevronLeft />
      </button>
      <button className='next-btn' onClick={nextPerson}>
        <FaChevronRight />
      </button>
      {!showAddForm ? (
        <button className='btn btn-add-review' onClick={toggleAddForm}>
          Add Review
        </button>
      ) : (
        <button className='btn btn-cancel' onClick={() => setShowAddForm(false)}>
          Cancel
        </button>
      )}
      {showAddForm && <Add onAddReview={addReview} />}
      </article>
      
    </main>
  )
}

export default Review