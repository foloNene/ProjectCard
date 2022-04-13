import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {db} from '../Base';
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";

import { storage } from '../Base';

import moment from 'moment';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { toast } from 'react-toastify'
import './Database.css';
import {AiFillGithub} from 'react-icons/ai';
import {FiFacebook} from 'react-icons/fi';
import {BsWhatsapp} from 'react-icons/bs';
import {GrLinkedin} from 'react-icons/gr';


const Database = () => {
 const [newFirstName, setNewFirstName] = useState("");
 const [newLastName, setNewLastName] = useState("");
 const [newWhatAppNumber, setNewWhatAppNumber] = useState("");
 const [newDescription, setNewDescription] = useState("");
 const [newFaceBook, setNewFaceBook] = useState("");
 const [newLinkedIn, setNewLinkedin] = useState("");
 const [newGitHub, setNewGitHub] = useState("");
 const [newMail, setNewMail] = useState("");
 const [newtime, setNewtime] = useState(Timestamp.now().toDate());
 const [imgurl, setImagurl] = useState('');
 const [progress, setProgress] = useState(0);
 //TuGOR function
 const [readMore, setReadMore] = useState(false)

 const [lsetf , setLsetf] = useState([]);
 const usersCollectionRef = collection (db, "students")

 //Delete Data
 const DeleteData = async (id) =>{
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
 }

 //Remove PlaceHolder
 const Remove = () => {
   document.getElementById("text1").value = " ";
   document.getElementById("text2").value = " ";
   document.getElementById("text3").value = " ";
   document.getElementById("text4").value = " ";
   document.getElementById("text5").value = " ";
   document.getElementById("text6").value = " ";
   document.getElementById("text7").value = " ";
   document.getElementById("text8").value = " ";
   document.getElementById("text9").value = " ";
 }

 //Create Data
 const createData =  () => {
    //ForStorage Picture
    const storageRef = ref(storage, `/images/${Date.now()}${imgurl.name}`);
      const uploadImage = uploadBytesResumable
      (storageRef, imgurl)
      uploadImage.on("state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) =>{
        console.log(err)
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
        .then((url) => {
         addDoc(usersCollectionRef, {
         firstName: newFirstName,
         lastName: newLastName,
         whatApp: newWhatAppNumber,
         description: newDescription,
         faceBook: newFaceBook,
         linkedIn: newLinkedIn,
         gitHub: newGitHub,
         time: newtime,
         mail: newMail,
         imgurl:url, })
         .then(() => {
           toast("Upload Successfully",
           {type:"success"});
           setProgress(0);
         })
         .catch(err=>{
           toast("Upload Failed",
           {type: "error"});
         })
      })
  });

 }

  //Get data
 const getData = async () => {
   const data = await getDocs(usersCollectionRef);
   setLsetf(data.docs.map((doc) => ({...doc.data(), id: doc.id })));

  }


 useEffect(() =>{
   getData();
 }, [])

  return (
    <div className='TotalContainer'>
      <Container>
        <LeftContainer>
          <ContainerHolder>
      <br/>
     <div><input id='text1' className='InputC' placeholder='firstName' onChange={(event) => {setNewFirstName(event.target.value);
     }}/></div>
     <br/>
     <div>
       <input  className='InputC'  id='text2' placeholder='lastName' onChange={(event) => {setNewLastName(event.target.value);
      }}/>
     </div>
     <br/>
     <div>
        {/*Description*/}
      <label htmlFor="">Description</label>
     </div>
     <div>
        <textarea id='text3' name="description" onChange={(event) => {setNewDescription(event.target.value);
      }}/>
     </div>
     <br/>
     <div>
        <input className='InputC'  id='text4' placeholder='whatApp' onChange={(event) =>{setNewWhatAppNumber(event.target.value);
      }}/>
     </div>
     <br/>

     <div>
       <input className='InputC' id='text5' placeholder='faceBook' onChange={(event) => {setNewFaceBook(event.target.value);
      }}/>
     </div>
     <br/>

     <div>
        <input className='InputC' id='text6' placeholder='linkedIn' onChange={(event) => {setNewLinkedin(event.target.value);
      }}/>
     </div>
     <br/>

     <div>
        <input className='InputC' id='text7' placeholder='gitHub'  onChange={(event) => {setNewGitHub(event.target.value);
      }}/>
     </div>
     <br/>

     <div>
       <input className='InputC' id='text8' placeholder='mail'  onChange={(event) => {setNewMail(event.target.value);
      }}/>
     </div>
     <br/>

     <div>
       <input className='InputC' id='text9' type="file" name="imgUrl" onChange={(event) => {setImagurl(event.target.files[0])}}/>
     </div>
     <br/>

     <div>
       {
        progress === 0? null : (
          <div style={{width:'250px', height: "400px"}}>
            <p style={{width: `${progress}%`,
            backgroundColor: "green"}}>
            { `Uploading Image ${progress}%`}
            </p>
            </div>
        )
      }
     </div>

     <div>
        {/* <button onClick={createData} >
      Create Profile</button> */}
      <button className='CreateButton' onClick={(() => {
        createData();
        Remove();
      })}>
        Create Profile
      </button>

     </div>
     </ContainerHolder>
      </LeftContainer>

      <RightContainer>
        <RightContainerHolder>
     {
      lsetf.map(({id, firstName, lastName,
        description,
        gitHub, linkedIn, whatApp, faceBook, time, imgurl, mail}) =>
       (
       <div key={id}>
         <DataHolder>
         <ImageHolder><img className='PersonImg' src={imgurl} alt="img" /></ImageHolder>
        <NameDiv>
          <NameHolder>
            <span> {firstName} </span>
            <span> {lastName}</span>
          </NameHolder>
        </NameDiv>
        <DescriptionTag>
        <p>Description: {readMore?description:`${description.substring(0, 20)}...`
        }
        <button  className="TugorButton"  onClick={() => setReadMore(!readMore)}>
          {readMore? 'show less' : 'read more'}
        </button>

        </p>
        </DescriptionTag>
        <LinkTagHolder>
        <LinkTag>
        <p><a  className='Links' href= {linkedIn} target="_blank" rel="noopener noreferrer" >
         <GrLinkedin/>
        </a></p>
        <p><a className='Links'  href= {gitHub} target="_blank" rel="noopener noreferrer" >
        <AiFillGithub/>
        </a></p>
         <p><a  className='Links' href= {whatApp} target="_blank" rel="noopener noreferrer">
         <BsWhatsapp/>
         </a></p>
         <p><a className='Links'  href= {faceBook} target="_blank" rel="noopener noreferrer">
         <FiFacebook/>
         </a></p>
         </LinkTag>
         </LinkTagHolder>
         <Mail>
         <ContactParagrap>Contact: {mail}</ContactParagrap>
         </Mail>

        <DateAndDelete>
           <p>{moment(time.toDate()).fromNow()}</p>
         {/* <p>{time.toDate().toDateString()}</p> */}

         <button className='DeleteButton' onClick={(() =>{
           DeleteData(id);
           getData();
         })}>
          Delete User
         </button>

        </DateAndDelete>


       </DataHolder>
       </div>
       ))}
       </RightContainerHolder>
       </RightContainer>

       </Container>
        <button className='RefreshButton' onClick={(() =>{
           getData();
         })}>
         Relaod
       </button>
    </div>
  )
}

export default Database;

const Container = styled.div`
 position: relative;
 width: 100%;
display:flex;
justify-content: space-around;
background-color: black;


@media screen and (max-width:480px){
  justify-content: center;
   flex-wrap: wrap;
   padding:0px;
   margin: 0px;
   width: 100%;
}

`

const LeftContainer = styled.div`
  position:fixed;
  right:75%;
  top: 0%;
//  background-color: red;
box-sizing: border-box;
// width: 40%;
width: 30%;
display: flex;
justify-content: center;
align-items: center;
z-index: 100;

@media screen and (max-width:850px){
  position:fixed;
  width: 30%;
   padding:0px;
}


@media screen and (max-width:480px){
  position:static;
  width: 100%;
   padding:0px;
}

`


const ContainerHolder = styled.div`
box-sizing: border-box;
background-color: whitesmoke;
width: 85%;
 font-size:smaller;

 :hover{
        Transform: scale(0.9);
        background-color: grey;
        color: black;
        font-size:medium;
   }

@media screen and (max-width:850px){
  width: 90%;
   padding:0px;
}
`


const RightContainer = styled.div`
width:100%;
// background-color: green;
display:flex;
justify-content: space-around;



`
const RightContainerHolder = styled.div`

  box-sizing: border-box;
  // background-color:  blue;
  width: 50%;

  @media screen and (max-width:480px){
  width: 90%;
   padding:0px;
}

`
const DataHolder = styled.div`
   box-sizing: border-box;
      border-style: dotted;
      background-color: pink;
      text-align: center;
      width: 100%;
      padding: 2px;
      background-color: white;
      margin: 2rem 0;
      box-shadow: var(--light-shadow);
      transition: var(--transition);
      border-radius: 10px;
      border-color: #92a8d1;
      font-size: smaller;

 :hover{
        Transform: scale(1.1);
        background-color: grey;
        color: black;
        font-size:medium;
   }

`

const NameDiv = styled.div`
// background-color: blue;
width:100%;
align-items:center;
justify-content: center;
display:flex;


`
const NameHolder = styled.div`
 font-size: 25px;

`
const LinkTag = styled.p`
width: 30%;
// background-color: grey;
display: flex;
justify-content: space-around;
align-items: center;
font-size: 20px;
color: black;

@media screen and (max-width:480px){
  width: 95%;
   padding:0px;
}

`

const LinkTagHolder = styled.div`
width: 100%;
// background-color:red;
display:flex;
justify-content: center;
color: black;
`

const Mail = styled.p`
align-items: center;
color: black;

`
const ImageHolder = styled.div`

`

const DescriptionTag = styled.div`

`

const DateAndDelete = styled.span`
display:flex;
justify-content: space-around;

@media screen and (max-width : 850px{
  width: 95%;
   padding:0px;
}

`

const ContactParagrap = styled.div`
display: flex;
justify-content: center;
width: 90%;

@media screen and (max-width:480px){
  width: 85%;
   padding:0px;
}

`

// const RefreshButton = styled.button`
//   background-color: grey
//   border: none;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   transition-duration: 0.4s;

//    :hover{
//    background-color: green
//   color: white;
//    }

// `

