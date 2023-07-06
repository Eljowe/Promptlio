import React from 'react'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'


//Custom STL 3D viewer resizing coming soon
const STLview = ({ STL, position }) => {
    const mountRef = useRef(null)
    useEffect(() => {
        var scene = new THREE.Scene()
        const helper = new THREE.GridHelper( 1000, 40, 0x303030, 0x303030 )
        helper.position.y = -40
        //scene.add( helper )

        var camera = new THREE.PerspectiveCamera( 35, 1, 1, 1000 )
        camera.position.set( 400, 170,10 )
        var renderer = new THREE.WebGLRenderer()
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.setClearColor( 0xffffff, 0)

        renderer.setPixelRatio( window.devicePixelRatio )

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 )
        hemiLight.position.set( 0, 100, 0 )
        scene.add( hemiLight )

        const dirLight = new THREE.DirectionalLight( 0xffffff )
        dirLight.position.set( - 0, 40, 50 )
        dirLight.castShadow = true
        dirLight.shadow.camera.top = 50
        dirLight.shadow.camera.bottom = - 25
        dirLight.shadow.camera.left = - 25
        dirLight.shadow.camera.right = 25
        dirLight.shadow.camera.near = 0.1
        dirLight.shadow.camera.far = 200
        dirLight.shadow.mapSize.set( 1024, 1024 )
        scene.add( dirLight )


        if (window.innerWidth > 500) {
            renderer.setSize(0.4*window.innerHeight, 0.4*window.innerHeight)
        } else {
            renderer.setSize(0.92*window.innerWidth, 0.92*window.innerWidth)
        }

        mountRef.current.appendChild( renderer.domElement )

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotate = true
        scene.userData.controls = controls //this allowed continuing scrolling div when in render view
        controls.minDistance = 400 //50
        controls.maxDistance = 400 //400
        controls.enableDamping = true

        camera.position.z = 5

        window.addEventListener( 'resize', onWindowResize, false )

        function onWindowResize(){
            renderer.setPixelRatio( window.devicePixelRatio )

            if (window.innerWidth > 500) {
                renderer.setSize(0.4*window.innerHeight, 0.4*window.innerHeight)
            } else {
                renderer.setSize(0.92*window.innerWidth, 0.92*window.innerWidth)
            }

            camera.aspect =1
            camera.updateProjectionMatrix()


        }

        var material = new THREE.MeshPhongMaterial( {
            color: '#8d8d8d',
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1
        } )


        const loader = new STLLoader()
        loader.load(
            STL,
            function (geometry) {
                const mesh = new THREE.Mesh(geometry, material)
                mesh.position.set(position.x, position.z, position.y) //x-z-y
                scene.add(mesh)
                var geo = new THREE.EdgesGeometry( mesh.geometry, 4)
                var mat = new THREE.LineBasicMaterial( { color: 0X000000, linewidth: 10 } ) //0XCCCCCC
                var wireframe = new THREE.LineSegments( geo, mat )
                //mesh.add( wireframe )
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )

        //const stats = Stats()
        //mountRef.current.appendChild( stats.dom )
        function animate() {
            requestAnimationFrame(animate)
            controls.update()

            render()

            //stats.update()
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()
    }, [])

    //mountRef.current.addEventListener('wheel', preventScroll, { passive: false })

    return (
        <div ref={mountRef}>

        </div>
    )
}

export default STLview