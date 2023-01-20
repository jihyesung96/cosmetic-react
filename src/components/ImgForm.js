import axios from 'axios';
import React, { useState } from 'react';

const ImgForm = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const onChangeImage = (e) => {
        const{name} = e.target;
        //<form>태그 생성
        const imageFormData = new FormData();
        //<form>태그에 속성추가하기
        imageFormData.append(name, e.target.files[0]);
        axios.post("http://localhost:8080/upload", imageFormData,{
            headers : {'content-type':'mulitpart/formdata'},
        }).then(res=>{
            console.log(res);
            setImageUrl(res.data.imageUrl);
        }).catch(e=>{
            console.log(e);
        })
    }
    return (
        <div>
            {/* <form encType='multipart/form-data' action='http://localhost:8080/upload'
            method='post'>
                <input type="file" name="file"/>
                <button type='submit'>등록</button>
            </form> */}
            <table>
                <tbody>
                <tr>
                    <td>file</td>
                    <td>
                        <input type="file" name='file' 
                        onChange={onChangeImage}/>
                        {
                            imageUrl ? <img src={`../images/${imageUrl}`} alt="" width="200px" height="200px"/> :
                            (<div id="upload-img-bg">
                                <img src="images/camera.png" alt='' width="200px" height="200px" />
                            </div>)
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ImgForm;