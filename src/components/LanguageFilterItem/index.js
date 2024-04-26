// Write your code here
const LanguageFilterItem = props => {
  const {details, isSelect, setActiveId} = props
  const {id, language} = details
  const btnClass = isSelect ? 'btn1' : 'btn2'

  const butOn = () => {
    setActiveId(id)
  }

  return (
    <li>
      <button type="button" className={`${btnClass}`} onClick={butOn}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
