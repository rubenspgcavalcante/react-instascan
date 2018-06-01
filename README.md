# React Instscan
Port of Instascan library to React

# Installing
npm
`npm install react-instascan --save`

yarn
`yarn add react-instascan`

# Using it

React Instascan exposes two Components: **Cameras** and **Scanner**.  
The "Cameras" component with a [render prop](https://reactjs.org/docs/render-props.html) and will fetch for the 
available cameras on your device.  
The Scanner Component receives as props the *camera* and a [**VideoHTMLElement**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 
as child element. Then it will call the *onScan* listener when reading a code. 
Other event types are also available (check the API table):
```jsx
<Cameras>
  {cameras => (
    <div>
      <h1>Scan the code!</h1>
      <Scanner camera={cameras[0]} onScan={onScan}>
        <video style={{ width: 400, height: 400 }} />
      </Scanner>
    </div>
  )}
</Cameras>
```

# Scanner properties

|      name         |         type      |                     description                   |
|-------------------|-------------------|---------------------------------------------------|
| camera            | object            | Camera object returned by \<Camera \/\>           |
| options           | object            | Same options from [Instascan.Scanner](https://github.com/schmich/instascan#let-scanner--new-instascanscanneropts)|
| stop              | boolean           | If stop is true the camera stops and vice-versa   |
| onScan            | function          | Emitted when a QR code is scanned using the camera in continuous mode |
| onStart           | function          | Called when camera is active and scanning has started |
| onStop            | function          | Called when camera and scanning have stopped |
| onActive          | function          | Emitted when the scanner becomes active as the result of stop becoming false or the tab gaining focus |
| onInactive        | function          | Emitted when the scanner becomes inactive as the result of stop becoming true or the tab losing focus |
|-------------------|-------------------|---------------------------------------------------|

For more details check the [Instascan API](https://github.com/schmich/instascan#api)

# License

This project is under the [MIT License](https://opensource.org/licenses/MIT)