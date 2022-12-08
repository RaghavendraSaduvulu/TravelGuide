import './index.css'

const PackageItem = props => {
  const {packageDetails} = props
  const {name, imageUrl, description} = packageDetails

  return (
    <li className="package-item">
      <img className="item-img" src={imageUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default PackageItem
