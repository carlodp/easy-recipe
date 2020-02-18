import React,{useState} from 'react';
import Modal from "./Modal";
import style from './recipe.module.css'

const Recipe = ({title, calories, image, ingredients, serving, timetocook, madeby, madebylink, healthlabels, dietlabels, cautions, nutrients, key}) => {
    const[openModal, setopenModal] = useState(false);

    return(
        <div className={style.recipe}>
            <div className={style.recipeContainer}>
                <div className={style.imageContainer}>
                    <img className={style.image} src={image} alt="" draggable="false"/>
                </div>
                <div className={style.seeMoreDiv}>
                    <div className={style.seeMoreDivBody}>
                        <div className={style.information}>
                            <h1 className={style.title}>{title}</h1>
                            <div className={style.subtitle}>
                                <p>Calories: <span>{calories.toFixed(0)}</span></p>
                                <p>Servings: <span>{serving}</span></p>
                            </div>
                        </div>
                        <p className={style.seeMoreButton} onClick={() => setopenModal(true)}>View Recipe</p>
                        <p className={style.madebylink}>By: <a target="_blank" rel="noopener noreferrer" href={madebylink}>{madeby}</a></p>
                    </div>
                </div>
            </div>
            <div className={style.modalContainer}>
            <Modal 
                openModal={openModal} 
                closeModal={() => setopenModal(false)}
                title={title} 
                calories={calories}
                image={image}
                serving={serving}
                timetocook={timetocook}
                ingredientList={ingredients}
                healthlabels={healthlabels}
                dietlabels={dietlabels}
                cautions={cautions}
                nutrientsList={nutrients}
            />
            </div>
        </div>
    );
}

export default Recipe;