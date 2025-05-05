import "./PreromanCard.css";

function PreromanCard({ preroman }) {
	const {
		name,
		image,
		unesco_heritage,
		information,
		web
	} = preroman;

	return (
		<div className="preroman_card">
			<img 
				src={image} 
				alt={name} 
			/>
			<h2>{name}</h2>
			<p><strong> {unesco_heritage && "Patrimonio de la Unesco"} </strong></p>
			{information && <p><strong>Información:</strong> {information}</p>}
			{web && <p><strong>Web:</strong> <a href={web} target="_blank"> {web}</a></p>}
		</div>
	)
}

export default PreromanCard;