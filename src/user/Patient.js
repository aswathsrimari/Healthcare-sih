import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'



const CreatePatient = ()=>{

    const [values, setValues] = useState({
        
        name:'',
        age: '',
        disease:'',
        description: '',
        formData : new FormData()

    })



  
    const {name,
    age,
    disease,
    description,
    } = values;


    const handleChange =name => event =>{
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        //formData.set(name, value)
        setValues({...values, [name]: value})

    }

    const clickSubmit = event =>{
        event.preventDefault()
        setValues({...values});
        console.log(values)

        
    }



    const newPostForm = () =>(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4> Post Photo </h4>
            <div className="form=group">
                <label className="btn btn-secondary">
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />     
            
            </div>

            <div className="form-group">
                <label className="text-muted">age</label>
                <input onChange={handleChange('age')} type="text" className="form-control" value={age} />     
            
            </div>
            <div className="form-group">
                <label className="text-muted">Disease</label>
                <input onChange={handleChange('disease')} type="text" className="form-control" value={disease} />     
            
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />     
            
            </div>

            <button className="btn btn-outline-primary">Create Patient</button>


        </form>
    );


    



    return(
        <Layout title="Add a new patient" description={`Good day , ready to add new patient!`} >
        <div className="row">
            <div className="col-md-8 offset-md-2">
           
             {newPostForm()}
            </div>
        </div>
    </Layout>

    )

}

export default CreatePatient;