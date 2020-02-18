import React, {useRef, useEffect} from 'react';
import modalStyle from './modal.module.css';

function useOuterClickNotifier(onOuterClick, innerRef) {
    useEffect(
        () => {
        // only add listener, if the element exists
        if (innerRef.current) {
            document.addEventListener("click", handleClick);
        }

        // unmount previous first in case inputs have changed
        return () => document.removeEventListener("click", handleClick);

        function handleClick(e) {
            innerRef.current && !innerRef.current.contains(e.target) && onOuterClick(e);
        }
        },
        [onOuterClick, innerRef] // invoke again, if inputs have changed
    );
}

const Modal = ({title, calories, serving, timetocook, image, ingredientList, openModal, closeModal, healthlabels, dietlabels, cautions, nutrientsList}) => {

    var timeCookDisplay;
    if(timetocook !== 0) {
        timeCookDisplay = <p>Time to Make: <span>{timetocook} Minutes</span></p>
    } else {
        timeCookDisplay = null;
    }

    const innerRef = useRef(null);
    useOuterClickNotifier(closeModal,innerRef);
    
    let modal = (
        <div className={modalStyle.modalWindow}>
            <div ref={innerRef} className={modalStyle.modalBody}>
                <button className={modalStyle.closeBtn} onClick={closeModal}>Close</button>
                <h1 className={modalStyle.recipeName}>{title}</h1>
                <div className={modalStyle.firstRow}>
                    <div className={modalStyle.recipeImage}>
                        <img src={image} alt={title} />
                    </div>
                    <div className={modalStyle.recipeHeadline}>
                        {/* Check if Time to Cook has value, if value is 0 it won't show */}
                        <div className={modalStyle.infoContainer}>
                            {timeCookDisplay} 
                            <p>Servings: <span>{serving}</span></p>
                            <p>Calories per Serving: <span>{(calories / serving).toFixed(0)}</span></p>
                        </div>
                        <div className={modalStyle.dietLabels}>
                            <p>Diet Tags</p>
                            {
                                dietlabels.map((dietlabel, index) => (
                                    <span>{dietlabel}</span>
                                ))
                            }
                        </div>
                        <div className={modalStyle.healthLabels}>
                            <p>Health Tags</p>
                            {
                                healthlabels.map((healthlabel, index) => (
                                    <span>{healthlabel}</span>
                                ))
                            }
                        </div>
                        <div className={modalStyle.cautions}>
                            <p>Cautions</p>
                            {
                                cautions.map((caution, index) => (
                                    <span>{caution}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={modalStyle.secondRow}>
                    <div className={modalStyle.ingredientContainer}>
                        <h2>Recipe Ingredients:</h2>
                        <ul>
                            {
                                ingredientList.map(ingredient => (
                                    <li>{ingredient.text}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={modalStyle.nutrients}>
                        <h2>Meal Nutritions:</h2>
                        <ul>
                            <li>{nutrientsList.ENERC_KCAL.label} / {nutrientsList.ENERC_KCAL.quantity} / {nutrientsList.ENERC_KCAL.unit}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    if(!openModal){modal = null;}
    return(modal);

}

export default Modal;