import React, { useState } from 'react'
import MovieInfo from './MovieInfo'

export default function SearchMovies(props) {
  const [movieSearched, setMovieSearched] = useState('')
  const [moviesData, setMoviesData] = useState([])

  const handleChange = (e) => {
    const { value } = e.target
    setMovieSearched(value)
  }

  const handleFetch = async (e) => {
    e.preventDefault()

    if (!movieSearched) return

    const url = `https://api.themoviedb.org/3/search/movie?api_key=ace6ed362db9324393ce2c258944da84&language=en-US&query=${movieSearched}&page=1&include_adult=false`

    try {
      const res = await fetch(url)
      const rawData = await res.json()
      setMoviesData(rawData.results)
      setMovieSearched('')
    } catch (err) {
      console.error(err)
    }
  }

  const results = moviesData
    .filter((movie) => movie.poster_path)
    .map((movie) => <MovieInfo key={movie.id} movie={movie} />)

  return (
    <>
      <form onSubmit={handleFetch} className="form">
        <label htmlFor="query" className="label">
          Movie Name:
        </label>
        <input
          className="input"
          onChange={handleChange}
          value={movieSearched}
          type="text"
          name="query"
          placeholder="Search for a Movie..."
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">{results}</div>
    </>
  )
}
