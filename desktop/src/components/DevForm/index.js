import React, { useState, useEffect } from 'react'

import './style.css'

function DevForm({ onSubmit }) {
  const [ github_username, setGithubUsername ] = useState('')
  const [ techs, setTechs ] = useState('')
  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      setLatitude(latitude)
      setLongitude(longitude)
    }, (error) => {
      console.log(error)
    }, {
      timeout: 3000
    })

  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithubUsername('')
    setTechs('')
    setLatitude('')
    setLongitude('')
  }

  return (
    <form onSubmit={ handleSubmit }> 
      <div className="input-block">
        <label htmlFor="github_username">Github user</label>
        <input
          id="github_username"
          type="text"
          name="github_username"
          spellCheck="false"
          onChange={ event => setGithubUsername(event.target.value) }
          value={ github_username }
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Technologies</label>
        <input 
          id="techs"
          type="text"
          name="techs"
          spellCheck="false"
          onChange={ event => setTechs(event.target.value) }
          value={ techs }
          required
        />
      </div>

      <div className="input-group"> 
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            name="latitude"
            spellCheck="false"
            onChange={ event => setLatitude(event.target.value) } 
            value={ latitude }
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitute">Longitute</label>
          <input 
            id="longitude"  
            name="longitude"
            spellCheck="false"
            onChange={ event => setLongitude(event.target.value) }
            value={ longitude }
            required
          />
        </div>
      </div>

      <button type="submit">Register</button>
    </form>
  )
}

export default DevForm
