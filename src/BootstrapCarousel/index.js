import React from 'react' 
import Carousel from 'react-bootstrap/Carousel'
import '../styles/carousel.css'


const BootstrapCarousel = () => {
    return(
        <div> 
            <div class='container-fluid' >  
                <div className="row title" style={{ marginBottom: "20px" }} >  
                    
                </div>  
            </div>  
            <div className='container-fluid' >  
                <Carousel>  
                    <Carousel.Item style={{'height':"500px", 'width':"1500px"}} >  
                        <img style={{'height':"500px"}}  className="d-block w-100" alt="car-img" src={'assets/img/img2.jpg'}  />  
                    <Carousel.Caption>  
                         
                    </Carousel.Caption>  
                    </Carousel.Item  >  
                    <Carousel.Item style={{'height':"500px", 'width':"1500px"}}>  
                        <img style={{'height':"500px"}} className="d-block w-100" alt="car-img"  src={'assets/img/img1.jpg'}/>  
                    <Carousel.Caption>  
                         
                    </Carousel.Caption>  
                    </Carousel.Item>  
                    <Carousel.Item style={{'height':"500px", 'width':"1500px"}}>  
                        <img style={{'height':"500px"}} className="d-block w-100" alt="car-img"  src={'assets/img/img3.jpg'}   />  
                    <Carousel.Caption>  
                         
                    </Carousel.Caption>  
                    </Carousel.Item> 
                    <Carousel.Item style={{'height':"500px", 'width':"1500px"}}>  
                        <img style={{'height':"500px"}} className="d-block w-100" alt="car-img"  src={'assets/img/img4.jpg'}   />  
                    <Carousel.Caption>  
                        
                    </Carousel.Caption>  
                    </Carousel.Item>   
                </Carousel>  
            </div>        
        </div> 
    )
}


export default BootstrapCarousel