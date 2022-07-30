import React, {useState, useContext, useEffect} from 'react';
import FileUploader from './FileUploader';
import KonvaStage from './KonvaStage';
import classes from './EditingBlock.module.css';
import {GlobalContext} from '../../context';

const generateId = () => (performance.now().toString(36) +
    Math.random().toString(36)).replace(/\./g, '');

const EditingBlock = () => {
    const {controlMode} = useContext(GlobalContext);
    const [images, setImages] = useState([]);

    useEffect(() => controlMode.setStatus(!!images.length), [images]);

    const addImages = base64Images => {
        const newImages = [];
        base64Images.forEach(file => {
            const image = document.createElement('img');
            image.src = file;
            newImages.push({id: generateId(), data: image});
        });
        setImages(images.concat(newImages));
    };

    return (
        <div className={classes.editingBlock}>
            {!controlMode.status ? <FileUploader addImages={addImages} images={images} /> : null}
            {controlMode.status ? <KonvaStage images={images} /> : null}
        </div>
    );
};

export default EditingBlock;