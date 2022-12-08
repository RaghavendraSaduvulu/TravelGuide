import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import PackageItem from '../PackageItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {packagesApiStatus: apiStatusConstants.initial, packages: []}

  componentDidMount() {
    this.getPackagesApi()
  }

  getPackagesApi = async () => {
    this.setState({packagesApiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.packages.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({
        packages: updatedData,
        packagesApiStatus: apiStatusConstants.success,
      })
    }
  }

  renderPackageSuccessView = () => {
    const {packages} = this.state

    return (
      <ul className="packages-list">
        {packages.map(eachItem => (
          <PackageItem key={eachItem.id} packageDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loading">
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  renderPackagesApi = () => {
    const {packagesApiStatus} = this.state

    switch (packagesApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderPackageSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="travel-guide-heading">Travel Guide</h1>
        {this.renderPackagesApi()}
      </div>
    )
  }
}

export default TravelGuide
