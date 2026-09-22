import { Check, X } from "reicon-react";
import Avatar from "./Avatar";

const ApplicationCard = ({
  application,
  onAccept,
  onReject,
  accepting,
  rejecting,
}: {
  application: any;
  onAccept: () => void;
  onReject: () => void;
  accepting: boolean;
  rejecting: boolean;
}) =>{
  const applicant =
    application.applicant;

  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={applicant.profilePhoto}
            name={`${applicant.FirstName} ${applicant.LastName}`}
          />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {applicant.FirstName}{" "}
              {applicant.LastName}
            </p>

            {applicant.location && (
              <p className="mt-0.5 text-xs text-gray-400">
                {applicant.location}
              </p>
            )}
          </div>
        </div>
      </div>

      {application.message && (
        <div className="mt-3 rounded-lg bg-gray-50 p-3">
          <p className="text-sm leading-5 text-gray-600">
            "{application.message}"
          </p>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onReject}
          disabled={rejecting || accepting}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-gray-200
            px-3
            py-2
            text-sm
            font-medium
            text-gray-600
            hover:bg-gray-50
            disabled:opacity-50
          "
        >
          <X size={15} />

          {rejecting
            ? "Rejecting..."
            : "Reject"}
        </button>

        <button
          type="button"
          onClick={onAccept}
          disabled={accepting || rejecting}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-[#397A68]
            px-3
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-[#2f6657]
            disabled:opacity-50
          "
        >
          <Check size={15} />

          {accepting
            ? "Accepting..."
            : "Accept"}
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;