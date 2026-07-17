import { CHURCH_INFO } from "../db"
import { AnimatePosition, slideUp } from "../ui/Framer"

export function ChurchMap() {
	return (
		<AnimatePosition variants={slideUp}>
			<div className="flex mb-4 items-center gap-3">
				<span className="material-symbols-outlined ">location_on</span>
				<p>
					Visit us in Kumasi
					<br />
					<span className="text-sm">{CHURCH_INFO.address.gpa}</span>
				</p>
				<span className="material-symbols-outlined ml-auto">church</span>
			</div>

			<iframe
				className="w-full h-100"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.39790308342!2d-1.649827290784224!3d6.721204993246686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb97b9e10fce3b%3A0x4af369bd6cf55235!2sFundamental%20Baptist%20Church%20International!5e0!3m2!1sen!2sgh!4v1736628732207!5m2!1sen!2sgh"
				title={`${CHURCH_INFO.name} Map`}
			/>
		</AnimatePosition>
	)
}
