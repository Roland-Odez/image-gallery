

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { imageData } from '../lib/images'
import { app } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import ImageContainer from '../components/ImageContainer'
import { useState, useEffect, createRef } from 'react'
import { ImageType } from '../types/imageTypes'
import Navbar from '../components/Navbar'
import Sortable from "sortablejs";


export default function Home() {
    const [images, setImages] = useState<ImageType[]>([...imageData])
    const [show, setShow] = useState<boolean>(true)
    const navigate = useNavigate()
    const auth = getAuth(app);
    const sortableContainer = createRef<HTMLElement>()

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate('/login')
            auth.signOut()
        }
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyImage = [...imageData]
        const searchResult = copyImage.filter((image) => {
            let contain = false;
            image.tag.forEach((el) => {
                if (el === e.currentTarget.value) {
                    contain = true;
                }
            })
            return contain
        })
        if (e.currentTarget.value === '') {
            setImages(imageData)
        } else {

            setImages(searchResult)
        }
        // setTimeout(() => (setImages(searchResult)), 2000)

    }


    const onDragEnd = (e: Sortable.SortableEvent) => {

        const imageItems = [...images]
        const [dragedImage] = imageItems.splice(Number(e.oldIndex), 1)
        imageItems.splice(Number(e.newIndex), 0, dragedImage)
        setImages(imageItems)
    }

    useEffect(() => {
        const container: HTMLElement | any = sortableContainer.current
        Sortable.create(container, {
            animation: 550,
            onEnd: onDragEnd
        })
        // if (mount) {
        //     console.log('swap is called ................')
        //     setMount(false)
        // }
        // Sortable.mount(new Swap());

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    return (
        <>
            <Navbar handleSearch={handleSearch} />
            <main className="overflow-y-auto h-screen pb-20 max-w-[1124px] mx-auto no-scrollbar">
                        <section
                    ref={sortableContainer}
                    className='px-3 py-4 grid grid-cols-2 md:grid-cols-custom gap-2 md:gap-4 no-scrollbar'>

                                    {
                                        images.map((image) => (
                                            <ImageContainer key={image?.id} image={image} />

                                        ))}

                        </section>
                {
                    show &&
                    <div className='z-30 absolute bg-white top-0 left-0 flex items-center justify-center w-full h-screen'>
                            <p className='text-lg font-pacific font-bold'>Loading...</p>
                        </div>
                }
            </main>
        </>
    )
}
