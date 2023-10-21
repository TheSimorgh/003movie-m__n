/* eslint-disable react/prop-types */
import Btn from "../../global/Btn";
import ModalContainer from "../../global/ModalContainer";
import { ImSpinner3 } from "react-icons/im";



const ConfirmModal = ({
  visible,
  busy,
  title,
  subtitle,
  onConfirm,
  onCancel,
}) => {
    const commonClass = "px-3 py-1 text-white rounded";


  return (
    <ModalContainer ignoreContainer visible={visible}>
      <div className="dark:bg-primary bg-white rounded p-3">
        <h1 className="text-red-400 font-semibold text-lg">{title}</h1>
        <p className="text-secondary dark:text-white text-sm">{subtitle}</p>
        <div className="flex items-center space-x-3 mt-3">
          {busy ? (
            <p className="flex items-center space-x-2 text-primary dark:text-white">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait</span>
            </p>
          ) : (
            <>
              <Btn
                onClick={onConfirm}
                type="button"
                className={commonClass + " bg-red-400"}
              >
                Confirm
              </Btn>
              <Btn
                onClick={onCancel}
                type="button"
                className={commonClass + " bg-blue-400"}
              >
                Cancel
              </Btn>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
