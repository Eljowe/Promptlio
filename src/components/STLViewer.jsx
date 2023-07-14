import React from 'react'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}


const STLview = ({ STL }) => {
    const mountRef = useRef(null)
    useEffect(() => {
        var scene = new THREE.Scene()
        const helper = new THREE.GridHelper( 1000, 40, 0x303030, 0x303030 )
        helper.position.y = 0
        //scene.add( helper )

        var camera = new THREE.PerspectiveCamera( 35, 1, 1, 1000 )
        camera.position.set( 400, 170,10 )
        var renderer = new THREE.WebGLRenderer()
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.setClearColor( 0xffffff, 0)

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

        const container = document.getElementById('3DBox');
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio( window.devicePixelRatio )
        container.appendChild(renderer.domElement);
        camera.aspect =container.offsetWidth/container.offsetHeight
        camera.updateProjectionMatrix()

        mountRef.current.appendChild( renderer.domElement )

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotate = true
        scene.userData.controls = controls //this allowed continuing scrolling div when in render view
        controls.minDistance = 300 //50
        controls.maxDistance = 300 //400
        controls.enableDamping = true

        camera.position.z = 5

        window.addEventListener( 'resize', onWindowResize, false )

        function onWindowResize(){
            renderer.setPixelRatio( window.devicePixelRatio )
            const container = document.getElementById('3DBox');
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            camera.aspect =container.offsetWidth/container.offsetHeight
            camera.updateProjectionMatrix()
            container.appendChild(renderer.domElement);
             
        }
        
        var material = new THREE.MeshPhongMaterial( {
            color: '#8d8d8d',
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        } )

        const loader = new STLLoader()
        
        loader.load(
            STL,
            function (geometry) {
                const mesh = new THREE.Mesh(geometry, material)
                const correctedposition = getCenterPoint(mesh)
                mesh.position.set(-correctedposition.x, -correctedposition.z, -correctedposition.y+7)
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

        /*
        var insidecolor = 0x000000
        var linecolor = 0xFFFFFF


        const sphereg = new THREE.SphereGeometry( 100, 15, 17, 0, 2*Math.PI, 0, 5.7428 )
        const sphereM = new THREE.MeshBasicMaterial(  { color: insidecolor } )
        const spheremesh = new THREE.Mesh( sphereg, sphereM )

        const material = new THREE.MeshBasicMaterial( { color: linecolor , wireframe: true, wireframeLinewidth: 1.3 } )
        const sphere = new THREE.Mesh( sphereg, material )
        sphere.scale.set(1.1, 1.1, 1.1)

        scene.add( sphere )
        scene.add( spheremesh )
        */
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
    }, [STL])

    //mountRef.current.addEventListener('wheel', preventScroll, { passive: false })
    return (
        <div 
            ref={mountRef}
            className={`stl-view`}
        >

        </div>
    )
}

export default STLview