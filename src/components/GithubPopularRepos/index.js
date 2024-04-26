import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatuses.initial,
    data: [],
    selected: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {selected} = this.state
    this.setState({apiStatus: apiStatuses.inProgress})
    const res = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selected}`,
    )
    if (res.ok) {
      const data = await res.json()
      const updated = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.avatar_url,
        startsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({data: updated, apiStatus: apiStatuses.success})
    } else {
      this.setState({apiStatus: apiStatuses.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader height={80} width={80} color="#0284c7" type="ThreeDots" />
    </div>
  )

  setActiveId = id => {
    this.setState({selected: id}, this.getData)
  }

  languageFilter = () => {
    const {selected} = this.state
    return (
      <ul>
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            isSelect={each.id === selected}
            key={each.id}
            details={each}
            setActiveId={this.setActiveId}
          />
        ))}
      </ul>
    )
  }

  repoListView = () => {
    const {data} = this.state
    return (
      <ul>
        {data.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderRepos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatuses.success:
        return this.repoListView()
      case apiStatuses.failure:
        return this.failureView()
      case apiStatuses.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Popular</h1>
        {this.languageFilter()}
        {this.renderRepos()}
      </div>
    )
  }
}
export default GithubPopularRepos
