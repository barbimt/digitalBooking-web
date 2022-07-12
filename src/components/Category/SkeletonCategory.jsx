import React from "react";
import ContentLoader from "react-content-loader";
// import ContentLoader, { Facebook } from 'react-content-loader'

const MyLoader = (props) => (
  <>
    {window.innerWidth >= 992 && (
      <>
        <ContentLoader
          speed={1}
          width={470}
          height={70}
          viewBox="0 0 467 70"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="33" y="13" rx="8" ry="8" width="360" height="40" />
        </ContentLoader>
        {/* <div
          className={
            window.innerWidth < 992
              ? " sm:grid-cols-1   categories-container-mobile categories-container grid grid-cols-2"
              : "grid grid-cols-4 category-container "
          }
        > */}
          <ContentLoader
            speed={1}
            width={1880}
            height={400}
            viewBox={"0 0 1880 400"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="33" y="1" rx="8" ry="8" width="453" height="340" />
            <rect x="33" y="349" rx="8" ry="8" width="250" height="23" />
            <rect x="33" y="375" rx="7" ry="7" width="150" height="20" />

            <rect x="507" y="1" rx="8" ry="8" width="453" height="340" />
            <rect x="507" y="349" rx="8" ry="8" width="250" height="23" />
            <rect x="507" y="375" rx="7" ry="7" width="150" height="20" />

            <rect x="980" y="1" rx="8" ry="8" width="453" height="340" />
            <rect x="980" y="349" rx="8" ry="8" width="250" height="23" />
            <rect x="980" y="375" rx="7" ry="7" width="150" height="20" />

            <rect x="1455" y="1" rx="8" ry="8" width="453" height="340" />
            <rect x="1455" y="349" rx="8" ry="8" width="250" height="23" />
            <rect x="1455" y="375" rx="7" ry="7" width="150" height="20" />

          
          </ContentLoader>
        
        {/* </div> */}
      </>
    )}
    {(window.innerWidth < 992 && window.innerWidth > 541) && (
      <>
        <ContentLoader
          speed={1}
          width={768}
          height={600}
          viewBox="0 0 768 600"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
             <rect x="20" y="35" rx="4" ry="4" width="350" height="29" /> 
          <rect x="20" y="85" rx="9" ry="9" width="328" height="184" />
          <rect x="20" y="275" rx="8" ry="8" width="190" height="25" />
          <rect x="20" y="305" rx="7" ry="7" width="156" height="21" />
          <rect x="400" y="85" rx="9" ry="9" width="328" height="184" />
          <rect x="400" y="275" rx="8" ry="8" width="190" height="25" />
          <rect x="400" y="305" rx="7" ry="7" width="156" height="21" />
          <rect x="20" y="340" rx="9" ry="9" width="328" height="184" />
          <rect x="20" y="530" rx="8" ry="8" width="190" height="25" />
          <rect x="20" y="560" rx="7" ry="7" width="156" height="21" />
          <rect x="400" y="340" rx="9" ry="9" width="328" height="184" />
          <rect x="400" y="530" rx="8" ry="8" width="190" height="25" />
          <rect x="400" y="560" rx="7" ry="7" width="156" height="21" />
        </ContentLoader>
      </>
    )}
    {window.innerWidth < 541 && (
      <>
        <ContentLoader
          speed={1}
          width={390}
          height={1000}
          viewBox="0 0 390 1000"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
           <rect x="10" y="30" rx="4" ry="4" width="300" height="20" /> 
           <rect x="10" y="60" rx="4" ry="4" width="360" height="170" /> 
           <rect x="10" y="240" rx="4" ry="4" width="240" height="20" /> 
           <rect x="10" y="265" rx="4" ry="4" width="230" height="15" /> 

      
           <rect x="10" y="300" rx="4" ry="4" width="360" height="170" /> 
           <rect x="10" y="480" rx="4" ry="4" width="240" height="20" /> 
           <rect x="10" y="505" rx="4" ry="4" width="230" height="15" /> 

           <rect x="10" y="540" rx="4" ry="4" width="360" height="170" /> 
           <rect x="10" y="720" rx="4" ry="4" width="240" height="20" /> 
           <rect x="10" y="745" rx="4" ry="4" width="230" height="15" /> 

           <rect x="10" y="780" rx="4" ry="4" width="360" height="170" /> 
           <rect x="10" y="960" rx="4" ry="4" width="240" height="20" /> 
           <rect x="10" y="990" rx="4" ry="4" width="230" height="15" />  

          {/* <rect x="6" y="12" rx="9" ry="9" width="417" height="180" />
          <rect x="6" y="205" rx="8" ry="8" width="262" height="30" />
          <rect x="6" y="244" rx="7" ry="7" width="170" height="21" />
          <rect x="6" y="277" rx="9" ry="9" width="417" height="180" />
          <rect x="6" y="470" rx="8" ry="8" width="262" height="30" />
          <rect x="6" y="509" rx="7" ry="7" width="170" height="21" /> */}
        </ContentLoader>
      </>
    )}
  </>
);

// const MyLoaderTablet = (props) => (
//   <>
//   <ContentLoader
//     speed={1}
//     width={768}
//     height={600}
//     viewBox="0 0 768 600"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
//     {...props}
//   >
//     <rect x="7" y="12" rx="9" ry="9" width="271" height="184" />
//     <rect x="9" y="210" rx="8" ry="8" width="203" height="30" />
//     <rect x="13" y="251" rx="7" ry="7" width="156" height="21" />
//     <rect x="296" y="11" rx="9" ry="9" width="271" height="184" />
//     <rect x="302" y="210" rx="8" ry="8" width="203" height="30" />
//     <rect x="301" y="250" rx="7" ry="7" width="156" height="21" />
//     <rect x="3" y="307" rx="9" ry="9" width="271" height="184" />
//     <rect x="5" y="505" rx="8" ry="8" width="203" height="30" />
//     <rect x="9" y="546" rx="7" ry="7" width="156" height="21" />
//     <rect x="292" y="306" rx="9" ry="9" width="271" height="184" />
//     <rect x="298" y="505" rx="8" ry="8" width="203" height="30" />
//     <rect x="297" y="545" rx="7" ry="7" width="156" height="21" />
//   </ContentLoader>
//   </>

// )

// const MyLoaderMobile = (props) => (
//   <ContentLoader
//     speed={1}
//     width={500}
//     height={500}
//     viewBox="0 0 500 1500"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
//     {...props}
//   >
//     <rect x="6" y="12" rx="9" ry="9" width="417" height="180" />
//     <rect x="6" y="205" rx="8" ry="8" width="262" height="30" />
//     <rect x="6" y="244" rx="7" ry="7" width="170" height="21" />
//     <rect x="6" y="277" rx="9" ry="9" width="417" height="180" />
//     <rect x="6" y="470" rx="8" ry="8" width="262" height="30" />
//     <rect x="6" y="509" rx="7" ry="7" width="170" height="21" />
//   </ContentLoader>
// )

export default MyLoader;
