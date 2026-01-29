
import { FormData } from "./paymentForm";

const ProofAndSender = ({
	formData,
	setFormData,
	handleFileChange,
}: {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className="mt-4 space-y-4">
			{/* Upload bukti */}
			<div>
				<label htmlFor="proofUrl" className="block font-medium">
					Upload Proof of Payment
				</label>
				<input
					type="file"
					id="proofUrl"
					onChange={handleFileChange}
					className="block w-full mt-2 border rounded-lg p-2"
				/>
				{formData.proofUrl && (
					<p className="mt-2 text-sm text-gray-600">
						File yang dipilih: {formData.proofUrl}
					</p>
				)}
			</div>

			{/* Nama Pengirim */}
			<div>
				<label htmlFor="paymentSender" className="block font-medium">
					Sender
				</label>
				<input
					type="text"
					id="paymentSender"
					value={formData.paymentSender}
					onChange={(e) =>
						setFormData({
							...formData,
							paymentSender: e.target.value,
						})
					}
					placeholder="John Doe"
					className="block w-full mt-2 border rounded-lg p-2"
				/>
			</div>
		</div>
	);
};


export default ProofAndSender;