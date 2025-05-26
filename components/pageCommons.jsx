import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';

import { Blocks } from 'react-loader-spinner';

import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

import Editor from './editor';
import VideoPanel from "./videoPanel";
import AudioPanel from "./audioPanel";
import ImagePanel from "./imagePanel";
import PageCommonControls from "./pageCommonControls";
import AttachmentPanel from "./attachmentPanel";
import Comments from "./comments";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

import { setIOSActivity, updateContentImagesDisplayIndex, downloadVideoThunk, setImageWordsMode, saveImageWordsThunk, saveDraftThunk, saveContentThunk, saveTitleThunk, uploadVideosThunk, setVideoWordsMode, saveVideoWordsThunk, uploadAudiosThunk, downloadAudioThunk, setAudioWordsMode, saveAudioWordsThunk, uploadImagesThunk, uploadAttachmentsThunk, setCommentEditorMode, saveCommentThunk, playingContentVideo, getS3SignedUrlForContentUploadThunk, setS3SignedUrlForContentUpload, loadDraftThunk, clearDraft, setDraftLoaded, startDownloadingContentImagesForDraftThunk, loadOriginalContentThunk, setContentType, setContentEditorMode, setInitialContentRendered, getPageTemplateThunk, loadPageTemplate, clearPageTemplate } from "../reduxStore/pageSlice";
import { debugLog } from '../lib/helper';
import { products, productIdDelimiter } from "../lib/productID";

export default function PageCommons() {
    const debugOn = true;
    const dispatch = useDispatch();

    const editorScriptsLoaded = useSelector(state => state.scripts.editorScriptsLoaded);
    const workspaceKey = useSelector(state => state.container.workspaceKey);
    const workspaceSearchKey = useSelector(state => state.container.searchKey);
    const workspaceSearchIV = useSelector(state => state.container.searchIV);
    const turningPage = useSelector(state => state.container.turningPage);

    const activity = useSelector(state => state.page.activity);

    const abort = useSelector(state => state.page.abort);
    const pageItemId = useSelector(state => state.page.id);
    const getPageContentDone = useSelector(state => state.page.getPageContentDone);
    const pageTemplate = useSelector(state => state.page.pageTemplate);
    const templateLoaded = useSelector(state => state.page.templateLoaded);
    const itemCopy = useSelector(state => state.page.itemCopy);
    const oldVersion = useSelector(state => state.page.oldVersion);
    const [titleEditorMode, setTitleEditorMode] = useState("ReadOnly");
    const titleEditorContent = useSelector(state => state.page.title);
    const contentEditorMode = useSelector(state => state.page.contentEditorMode);
    const contentEditorContent = useSelector(state => state.page.content);
    const initialContentRendered = useSelector(state => state.page.initialContentRendered);
    const [contentEditorContentWithImagesAndVideos, setcontentEditorContentWithImagesAndVideos] = useState(null);

    const [editingEditorId, setEditingEditorId] = useState(null);
    const [readyForSaving, setReadyForSaving] = useState(false);

    const S3SignedUrlForContentUpload = useSelector(state => state.page.S3SignedUrlForContentUpload);
    const contentImagesDownloadQueue = useSelector(state => state.page.contentImagesDownloadQueue);
    const contentImagesDisplayIndex = useSelector(state => state.page.contentImagesDisplayIndex);
    const contentImagesAllDownloaded = useSelector(state => state.page.contentImagesAllDownloaded);
    const contentImagesAllDisplayed = (contentImagesDisplayIndex === contentImagesDownloadQueue.length);
    const contentVideosDownloadQueue = useSelector(state => state.page.contentVideosDownloadQueue);
    const videoPanelsState = useSelector(state => state.page.videoPanels);
    const audioPanelsState = useSelector(state => state.page.audioPanels);
    const imagePanelsState = useSelector(state => state.page.imagePanels);
    const attachmentPanelsState = useSelector(state => state.page.attachmentPanels);
    const comments = useSelector(state => state.page.comments);
    const draft = useSelector(state => state.page.draft);
    const draftLoaded = useSelector(state => state.page.draftLoaded);
    const [renderingDraft, setRenderingDraft] = useState(false);
    const contentType = useSelector(state => state.page.contentType);

    const spinnerRef = useRef(null);
    const pswpRef = useRef(null);

    const videoFilesInputRef = useRef(null);
    const [videosDragActive, setVideosDragActive] = useState(false);

    const imageFilesInputRef = useRef(null);
    const [imagesDragActive, setImagesDragActive] = useState(false);

    const audioFilesInputRef = useRef(null);
    const [audioDragActive, setAudiosDragActive] = useState(false);

    const attachmentsInputRef = useRef(null);
    const [attachmentsDragActive, setAttachmentsDragActive] = useState(false);

    let productId = "";
    if (pageItemId && pageItemId.split(":")[1].startsWith(productIdDelimiter)) {
        productId = pageItemId.split(productIdDelimiter)[1];
    }
    let product = {};
    if (productId) {
        product = products[productId];
    }

    const onVideoClicked = (queueId) => {
        debugLog(debugOn, "onVideoClicked: ", queueId);
        for (const thisPanel of videoPanelsState) {
            if (thisPanel.queueId === queueId) {
                const id = thisPanel.queueId;
                const s3KeyPrefix = thisPanel.s3KeyPrefix;
                const numberOfChunks = thisPanel.numberOfChunks;
                dispatch(downloadVideoThunk({ id, s3KeyPrefix, numberOfChunks, fileName: thisPanel.fileName, fileType: thisPanel.fileType, fileSize: thisPanel.fileSize }));
                break;
            }
        }
    }

    const onAudioClicked = (queueId) => {
        debugLog(debugOn, "onAudioClicked: ", queueId);
        for (const thisPanel of audioPanelsState) {
            if (thisPanel.queueId === queueId) {
                const id = thisPanel.queueId;
                const s3KeyPrefix = thisPanel.s3KeyPrefix;
                const numberOfChunks = thisPanel.numberOfChunks;
                dispatch(downloadAudioThunk({ id, s3KeyPrefix, numberOfChunks, fileName: thisPanel.fileName, fileType: thisPanel.fileType, fileSize: thisPanel.fileSize }));
                break;
            }
        }
    }

    const onImageClicked = (queueId) => {
        debugLog(debugOn, "onImageClicked: ", queueId);

        const slides = [];
        let startingIndex;
        for (let i = 0; i < imagePanelsState.length; i++) {
            const thisPanel = imagePanelsState[i];
            if (thisPanel.status !== "Uploaded" && thisPanel.status !== "Downloaded") continue;
            const item = {};
            item.src = thisPanel.src;
            item.w = thisPanel.width;
            item.h = thisPanel.height;
            slides.push(item);
            if (thisPanel.queueId === queueId) {
                startingIndex = slides.length - 1;
            }
        }
        const pswpElement = pswpRef.current;
        const options = {
            // optionName: 'option value'
            // for example:
            history: false,
            index: startingIndex // start at first slide
        };
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, slides, options);
        gallery.init();
    }

    const handleDrawingClicked = (data) => {
        const slides = [data];
        const pswpElement = pswpRef.current;
        const options = {
            // optionName: 'option value'
            // for example:
            history: false,
            index: 0
        };
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, slides, options);
        gallery.init();
    }

    const handleVideoClick = (e) => {
        let playVideoElement = e.target;
        if (e.target.tagName === 'I') {
            playVideoElement = e.target.parentNode;
        }
        const videoId = playVideoElement.id.replace('playVideoCenter_', "");
        const containerElement = playVideoElement.parentNode;
        playVideoElement.remove();

        let spinnerElement = createSpinnerForImage(videoId);
        containerElement.appendChild(spinnerElement);
        const id = videoId;
        const idParts = id.split('&');
        if (idParts[0] === 'chunks') {
            let s3KeyPrefix = idParts[3];
            let numberOfChunks = parseInt(idParts[1]);
            let fileName = idParts[2];
            let fileSize = parseInt(idParts[5]);
            let fileType = idParts[4];
            dispatch(downloadVideoThunk({ fromContent: true, id, s3KeyPrefix, numberOfChunks, fileName, fileType, fileSize }));
        } else {
            let s3Key = idParts[0];
            dispatch(downloadVideoThunk({ id, s3Key }));
        }

    };

    function createSpinnerForImage(imageId) {
        let spinnerElement = spinnerRef.current.cloneNode(true);
        spinnerElement.className = 'bsafesImageSpinner';
        spinnerElement.id = 'spinner_' + imageId;
        spinnerElement.style.position = 'absolute';
        spinnerElement.style.textAlign = 'center';
        spinnerElement.removeAttribute('hidden');
        return spinnerElement;
    }

    function createPlayVideoButton(image) {
        let playVideoCenterElement = document.createElement('div');
        let playVideoId = 'playVideoCenter_' + image.id;
        let playVideoButtonId = 'playVideoButton_' + image.id;
        playVideoCenterElement.className = 'bsafesPlayVideo';
        playVideoCenterElement.id = playVideoId;
        playVideoCenterElement.style.position = 'absolute';
        playVideoCenterElement.style.width = '100px';
        playVideoCenterElement.style.borderRadius = '10px';
        playVideoCenterElement.style.textAlign = 'center';
        playVideoCenterElement.style.background = 'white';
        playVideoCenterElement.style.opacity = '0.5';
        playVideoCenterElement.innerHTML = `<i class="fa fa-play-circle-o fa-4x text-danger" id=${playVideoButtonId} aria-hidden="true"></i>`;
        return playVideoCenterElement;
    }

    function beforeWritingContent() {
        if (contentType === "WritingPage") {
            const spinners = document.querySelectorAll('.bsafesImageSpinner');
            spinners.forEach((spinner) => {
                spinner.remove();
            });

            const playVideos = document.querySelectorAll('.bsafesPlayVideo');
            playVideos.forEach((playVideo) => {
                playVideo.remove();
            });

            let contentByDOM = document.querySelector('.contenEditorRow').querySelector('.inner-html');
            if (contentByDOM)
                setcontentEditorContentWithImagesAndVideos(contentByDOM.innerHTML);
        }
        dispatch(getS3SignedUrlForContentUploadThunk());
    }

    const handleDraftSample = (content) => {
        debugLog(debugOn, "draft content: ", content);
        dispatch(saveDraftThunk({ content }))
    }

    const handleDraftClicked = () => {
        dispatch(loadDraftThunk());
        if (editorScriptsLoaded) {
            dispatch(setInitialContentRendered(true));
        }
    }

    const handleDraftDelete = () => {
        dispatch(clearDraft());
    }

    function afterContentReadOnly() {
        if (editorScriptsLoaded) {
            dispatch(setInitialContentRendered(true));
        }
    }

    const handlePenClicked = (editorId, purpose) => {
        debugLog(debugOn, `pen ${editorId} clicked ${purpose}`);
        let thisReadyForSaving = true;
        if (editorId === 'content') {
            if (purpose === 'froala')
                dispatch(setContentType('WritingPage'));
            else if (purpose === 'excalidraw') {
                dispatch(setContentType('DrawingPage'));
            }
        }
        if (editorId === 'content') {
            beforeWritingContent();
            dispatch(setContentEditorMode("Writing"));
            setEditingEditorId("content");
            thisReadyForSaving = false;
        } else if (editorId === 'title') {
            setTitleEditorMode("Writing");
            setEditingEditorId("title");
        } else if (editorId.startsWith("video_")) {
            const videoIndex = parseInt(editorId.split("_")[1]);
            dispatch(setVideoWordsMode({ index: videoIndex, mode: "Writing" }));
            setEditingEditorId(editorId);
        } else if (editorId.startsWith("audio_")) {
            const audioIndex = parseInt(editorId.split("_")[1]);
            dispatch(setAudioWordsMode({ index: audioIndex, mode: "Writing" }));
            setEditingEditorId(editorId);
        } else if (editorId.startsWith("image_")) {
            const imageIndex = parseInt(editorId.split("_")[1]);
            dispatch(setImageWordsMode({ index: imageIndex, mode: "Writing" }));
            setEditingEditorId(editorId);
        } else if (editorId.startsWith("comment_")) {
            dispatch(setCommentEditorMode({ index: editorId, mode: "Writing" }));
            setEditingEditorId(editorId);
        }
        setReadyForSaving(thisReadyForSaving);
    }

    const handleContentChanged = (editorId, content) => {
        debugLog(debugOn, `editor-id: ${editorId} content: ${content}`);

        if (editingEditorId === "content") {
            if (contentType === "DrawingPage" || draftLoaded || content !== contentEditorContent) {
                if (contentType === "WritingPage") {
                    setcontentEditorContentWithImagesAndVideos(content);
                }
                dispatch(saveContentThunk({ content, workspaceKey }));
            } else {
                setEditingEditorMode("ReadOnly");
                setEditingEditorId(null);
                dispatch(clearPageTemplate());
                dispatch(setDraftLoaded(false));
            }
        } else if (editingEditorId === "title") {
            if (content !== titleEditorContent) {
                dispatch(saveTitleThunk(content, workspaceKey, workspaceSearchKey, workspaceSearchIV));
            } else {
                setEditingEditorMode("ReadOnly");
                setEditingEditorId(null);
            }
        } else if (editingEditorId.startsWith("video_")) {
            const videoIndex = parseInt(editingEditorId.split("_")[1]);
            console.log(content, videoPanelsState[videoIndex].words)
            if (content !== videoPanelsState[videoIndex].words) {
                dispatch(saveVideoWordsThunk({ index: videoIndex, content: content }));
            } else {
                dispatch(setVideoWordsMode({ index: videoIndex, mode: "ReadOnly" }));
                setEditingEditorId(null);
            }
        } else if (editingEditorId.startsWith("audio_")) {
            const audioIndex = parseInt(editingEditorId.split("_")[1]);
            console.log(content, audioPanelsState[audioIndex].words)
            if (content !== audioPanelsState[audioIndex].words) {
                dispatch(saveAudioWordsThunk({ index: audioIndex, content: content }));
            } else {
                dispatch(setAudioWordsMode({ index: audioIndex, mode: "ReadOnly" }));
                setEditingEditorId(null);
            }
        } else if (editingEditorId.startsWith("image_")) {
            const imageIndex = parseInt(editingEditorId.split("_")[1]);
            if (content !== imagePanelsState[imageIndex].words) {
                dispatch(saveImageWordsThunk({ index: imageIndex, content: content }));
            } else {
                dispatch(setImageWordsMode({ index: imageIndex, mode: "ReadOnly" }));
                setEditingEditorId(null);
            }
        } else if (editingEditorId.startsWith("comment_")) {
            if (editingEditorId !== 'comment_New') {
                let index = parseInt(editingEditorId.split('_')[1]);
                if (comments[index].content === content) {
                    dispatch(setCommentEditorMode({ index: editingEditorId, mode: "ReadOnly" }));
                    setEditingEditorId(null);
                    return;
                }
            }
            dispatch(saveCommentThunk({ index: editingEditorId, content }));
        }
    }

    const videoPanels = videoPanelsState.map((item, index) =>
        <VideoPanel key={item.queueId} panelIndex={"video_" + index} panel={item} onVideoClicked={onVideoClicked} editorMode={item.editorMode} onPenClicked={handlePenClicked} onContentChanged={handleContentChanged} editable={!editingEditorId && (activity === 0)} />
    )

    const audioPanels = audioPanelsState.map((item, index) =>
        <AudioPanel key={item.queueId} panelIndex={"audio_" + index} panel={item} onAudioClicked={onAudioClicked} editorMode={item.editorMode} onPenClicked={handlePenClicked} onContentChanged={handleContentChanged} editable={!editingEditorId && (activity === 0)} />
    )

    const imagePanels = imagePanelsState.map((item, index) =>
        <ImagePanel key={item.queueId} panelIndex={"image_" + index} panel={item} onImageClicked={onImageClicked} editorMode={item.editorMode} onPenClicked={handlePenClicked} onContentChanged={handleContentChanged} editable={!editingEditorId && (activity === 0)} />
    )

    const handleWrite = () => {
        debugLog(debugOn, "handleWrite");
        beforeWritingContent();
        if (!draftLoaded || (draftLoaded && contentImagesDownloadQueue.length === 0)) {
            dispatch(setContentEditorMode("Writing"));
            setEditingEditorId("content");
        }
    }

    const setEditingEditorMode = (mode) => {
        switch (editingEditorId) {
            case 'content':
                dispatch(setContentEditorMode(mode));
                break;
            case 'title':
                setTitleEditorMode(mode);
                break;
            default:
                if (editingEditorId.startsWith("video_")) {
                    const videoIndex = parseInt(editingEditorId.split("_")[1]);
                    switch (mode) {
                        case "Saving":
                        case "ReadOnly":
                            dispatch(setVideoWordsMode({ index: videoIndex, mode }))
                            break;
                        default:
                    }
                } if (editingEditorId.startsWith("audio_")) {
                    const audioIndex = parseInt(editingEditorId.split("_")[1]);
                    switch (mode) {
                        case "Saving":
                        case "ReadOnly":
                            dispatch(setAudioWordsMode({ index: audioIndex, mode }))
                            break;
                        default:
                    }
                } else if (editingEditorId.startsWith("image_")) {
                    const imageIndex = parseInt(editingEditorId.split("_")[1]);
                    switch (mode) {
                        case "Saving":
                        case "ReadOnly":
                            dispatch(setImageWordsMode({ index: imageIndex, mode }))
                            break;
                        default:
                    }

                } else if (editingEditorId.startsWith("comment_")) {
                    switch (mode) {
                        case "Writing":
                        case "Saving":
                        case "ReadOnly":
                            dispatch(setCommentEditorMode({ index: editingEditorId, mode }))
                            break;
                        default:
                    }
                } else {

                }
        }
    }

    const handleSave = () => {
        debugLog(debugOn, "handleSave");
        setEditingEditorMode("Saving");
        setReadyForSaving(false);
    }

    const handleCancel = () => {
        debugLog(debugOn, "handleCancel");
        dispatch(setS3SignedUrlForContentUpload(null));
        if (editingEditorId === "content" && contentType === "DrawingPage" && templateLoaded) {
            setEditingEditorMode("GeneratingDrawingImage");
        } else {
            setEditingEditorMode("ReadOnly");
            setEditingEditorId(null);
            if (!draft && !contentEditorContent) {
                dispatch(setContentType(""))
            }
            if (draftLoaded) {
                dispatch(loadOriginalContentThunk());
            }
            dispatch(setDraftLoaded(false));
            setReadyForSaving(false);
        }
    }

    const handleDrawingImageDone = () => {
        setEditingEditorMode("ReadOnly");
        setEditingEditorId(null);
        setReadyForSaving(false);
        dispatch(loadPageTemplate({ template: { metadata: { ExcalidrawSerializedJSON: pageTemplate } }, type: "DrawingPage" }));
    }

    const handleVideoButton = (e) => {
        debugLog(debugOn, "handleVideoBtn");
        e.preventDefault();
        videoFilesInputRef.current.value = null;
        videoFilesInputRef.current?.click();
    };

    const uploadVideos = (files, where) => {
        dispatch(uploadVideosThunk({ files, where, workspaceKey }));
    };

    const handleVideoFiles = (e) => {
        e.preventDefault();
        debugLog(debugOn, "handleVideoFiles: ", e.target.id);
        const files = e.target.files;
        if (files.length) {
            uploadVideos(files, 'top');
        }
    }

    const handleImageButton = (e) => {
        debugLog(debugOn, "handleImageBtn");
        e.preventDefault();
        imageFilesInputRef.current.value = null;
        imageFilesInputRef.current?.click();
    };

    const uploadImages = (files, where) => {
        dispatch(uploadImagesThunk({ files, where, workspaceKey }));
    };

    const handleImageFiles = (e) => {
        e.preventDefault();
        debugLog(debugOn, "handleImageFiles: ", e.target.id);
        const files = e.target.files;
        if (files.length) {
            uploadImages(files, 'top');
        }
    }

    const handleAudioButton = (e) => {
        debugLog(debugOn, "handleAudioBtn");
        e.preventDefault();
        audioFilesInputRef.current.value = null;
        audioFilesInputRef.current?.click();
    };

    const uploadAudios = (files, where) => {
        dispatch(uploadAudiosThunk({ files, where, workspaceKey }));
    };

    const handleAudioFiles = (e) => {
        e.preventDefault();
        debugLog(debugOn, "handleAudioFiles: ", e.target.id);
        const files = e.target.files;
        if (files.length) {
            uploadAudios(files, 'top');
        }
    }

    const attachmentPanels = attachmentPanelsState.map((item, index) =>
        <AttachmentPanel key={item.queueId} panelIndex={"attachment_" + index} panel={item} />
    )

    const handleAttachmentButton = (e) => {
        debugLog(debugOn, "handleAttachmentBtn");
        e.preventDefault();
        attachmentsInputRef.current.value = null;
        attachmentsInputRef.current?.click();
    };

    const uploadAttachments = (files) => {
        dispatch(uploadAttachmentsThunk({ files, workspaceKey }));
    };

    const handleAttachments = (e) => {
        e.preventDefault();
        debugLog(debugOn, "handleAttachments: ", e.target.id);
        const files = e.target.files;
        if (files.length) {
            uploadAttachments(files);
        }
    }

    const setDragActive = (e, active) => {
        if (e.target.id === "videos") {
            setVideosDragActive(active);
        } else if (e.target.id === "images") {
            setImagesDragActive(active);
        } else {
            setAttachmentsDragActive(active);
        }
    }

    const handleDrag = (e) => {
        debugLog(debugOn, "handleDrag");
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(e, true);
        } else if (e.type === "dragleave") {
            setDragActive(e, false);
        }
    }

    const handleDrop = function (e) {
        debugLog(debugOn, "handleDrop: ", e.target.id);
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e, false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            debugLog(debugOn, "handleDrop, at least one file.");
            // at least one file has been dropped so do something
            // handleFiles(e.dataTransfer.files);
            if (e.target.id === 'videos') {
                const videoType = /video.*/;
                const videos = [];
                for (const file of e.dataTransfer.files) {
                    if (!file.type.match(videoType)) {
                        debugLog(debugOn, "Not an image.");
                    }
                    else videos.push(file);
                }
                uploadVideos(videos, 'top');
            } else if (e.target.id === 'images') {
                const imageType = /image.*/;
                const images = [];
                for (const file of e.dataTransfer.files) {
                    if (!file.type.match(imageType)) {
                        debugLog(debugOn, "Not an image.");
                    }
                    else images.push(file);
                }
                uploadImages(images, 'top');
            } else if (e.target.id === 'audios') {
                const audioType = /audio.*/;
                const audios = [];
                for (const file of e.dataTransfer.files) {
                    if (!file.type.match(audioType)) {
                        debugLog(debugOn, "Not an audio.");
                    }
                    else audios.push(file);
                }
                uploadAudios(audios, 'top');
            } else if (e.target.id === 'attachments') {
                debugLog(debugOn, "handleDrop attachments: ", e.dataTransfer.files.length);
                const attachments = [];
                for (const file of e.dataTransfer.files) {
                    attachments.push(file);
                }
                uploadAttachments(attachments);
            }
        }
        setDragActive(e, false);
    };

    const handleContentWritingModeReady = (e) => {
        const bSafesDownloadVideoImages = document.getElementsByClassName('bSafesDownloadVideo');
        for (let i = 0; i < bSafesDownloadVideoImages.length; i++) {
            let image = bSafesDownloadVideoImages[i];
            let containerElement = image.parentNode;
            let playVideoElement = createPlayVideoButton(image);
            containerElement.appendChild(playVideoElement);
            playVideoElement.onclick = handleVideoClick;
        }
        return;
    }

    const buildContentImagesGallery = (selectedId) => {
        debugLog(debugOn, "buildContentImagesGallery");
        const slides = [];
        let startingIndex;
        const images = document.querySelectorAll(".bSafesImage");
        images.forEach((image) => {
            if (image.src.startsWith("blob")) {
                const item = {};
                const id = image.id;
                const idParts = id.split('&');
                const dimension = idParts[1];
                const dimensionParts = dimension.split('x');
                item.src = image.src;
                item.w = dimensionParts[0];
                item.h = dimensionParts[1];
                slides.push(item);
                if ((image.id === selectedId)) {
                    startingIndex = slides.length - 1;
                }
            }
        });
        const pswpElement = pswpRef.current;
        const options = {
            // optionName: 'option value'
            // for example:
            history: false,
            index: startingIndex // start at first slide
        };
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, slides, options);
        gallery.init();
    }

    const handleContentReadOnlyModeReady = (e) => {
        const playVideos = document.querySelectorAll('.bsafesPlayVideo');
        playVideos.forEach((playVideo) => {
            playVideo.remove();
        });

        const bSafesDownloadVideoImages = document.getElementsByClassName('bSafesDownloadVideo');
        for (let i = 0; i < bSafesDownloadVideoImages.length; i++) {
            let image = bSafesDownloadVideoImages[i];
            let containerElement = image.parentNode;
            let playVideoElement = createPlayVideoButton(image);
            containerElement.appendChild(playVideoElement);
            playVideoElement.onclick = handleVideoClick;
        }

        const images = document.querySelectorAll(".bSafesImage");
        images.forEach((item) => {
            if (item.src.startsWith("blob")) {
                item.onclick = () => {
                    buildContentImagesGallery(item.id);
                }
            }
        });

        return;
    }

    const iOSActivityWebCallFromIOS = (data) => {
        debugLog(debugOn, "iOSActivityWebCallFromIOS", data);
        dispatch(setIOSActivity(data.activity))
    }

    useEffect(() => {
        debugLog(debugOn, "pageCommons mounted.");
        if (process.env.NEXT_PUBLIC_platform === 'iOS') {
            window.bsafesNative.iOSActivityWebCall = iOSActivityWebCallFromIOS
        }
    }, []);

    useEffect(() => {
        setcontentEditorContentWithImagesAndVideos(null);
    }, [pageItemId])

    useEffect(() => {
        if (activity === 0) {
            if (editingEditorId) {
                setEditingEditorMode("ReadOnly");
                setEditingEditorId(null);
            }
        } else if (activity === "Error") {
            if (editingEditorId) {
                setEditingEditorMode("Writing");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity]);

    useEffect(() => {
        if (getPageContentDone) {
            if (!itemCopy || !itemCopy.content) {
                dispatch(getPageTemplateThunk({ url: "https://pagetemplate.bsafes.com/A002.draw" }))
            }
        }
    }, [getPageContentDone])

    useEffect(() => {
        if (pageTemplate) {
            if (pageTemplate.startsWith('{\n  "type": "excalidraw"')) {
                debugLog(debugOn, "Loading page template");
                dispatch(loadPageTemplate({ template: { metadata: { ExcalidrawSerializedJSON: pageTemplate } }, type: "DrawingPage" }));
            }
        }
    }, [pageTemplate]);

    useEffect(() => {
        if (templateLoaded) {
            handleWrite();
        }
    }, [templateLoaded])

    useEffect(() => {
        setcontentEditorContentWithImagesAndVideos(contentEditorContent);
        if (contentEditorContent === null) return;
        afterContentReadOnly();
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [contentEditorContent]);

    useEffect(() => {
        if (!initialContentRendered || (draftLoaded && !renderingDraft)) return;
        let image, imageElement, containerElement;
        let i = contentImagesDisplayIndex;

        const videoControlsElements = document.querySelectorAll(".videoControls");
        videoControlsElements.forEach((item) => {
            item.remove();
        });

        if (i < contentImagesDownloadQueue.length) {
            image = contentImagesDownloadQueue[i];
            imageElement = document.getElementById(image.id);
            if (!imageElement) {
                dispatch(updateContentImagesDisplayIndex(i + 1));
                return;
            }

            if (!imageElement.parentNode.classList.contains('bsafesMediaContainer')) {
                containerElement = document.createElement('div');
                containerElement.className = 'bsafesMediaContainer';
                containerElement.style.display = 'flex';
                containerElement.style.alignItems = 'center';
                containerElement.style.justifyContent = 'center';
                let imageElementClone = imageElement.cloneNode(true);
                containerElement.appendChild(imageElementClone);
                imageElement.replaceWith(containerElement);
                imageElement = imageElementClone;
                let spinnerElement = createSpinnerForImage(image.id);
                containerElement.appendChild(spinnerElement);
            } else {
                containerElement = imageElement.parentNode;
                let spinnerElement = document.getElementById('spinner_' + image.id);
                if (!spinnerElement) {
                    let spinnerElement = createSpinnerForImage(image.id);
                    containerElement.appendChild(spinnerElement);
                }
            }
            if (image.status === "Downloading") {

                return;
            } else if ((image.status === "Downloaded") || (image.status === "DownloadFailed")) {

                let spinnerElement = document.getElementById('spinner_' + image.id);
                if (spinnerElement) spinnerElement.remove();
                if (image.status === "Downloaded") {
                    imageElement.src = image.src;
                }
                if (imageElement.classList.contains('bSafesDownloadVideo')) {
                    let playVideoCenterElement = null;
                    playVideoCenterElement = document.getElementById('playVideoCenter_' + image.id)

                    if (!playVideoCenterElement && contentEditorMode === 'ReadOnly') {
                        playVideoCenterElement = createPlayVideoButton(image);
                        containerElement.appendChild(playVideoCenterElement);

                    }
                    if (contentEditorMode === 'ReadOnly') playVideoCenterElement.onclick = handleVideoClick;
                } else {
                    imageElement.onload = () => {
                        imageElement.onclick = () => {
                            buildContentImagesGallery(imageElement.id);
                        }
                    }
                }
                dispatch(updateContentImagesDisplayIndex(i + 1));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [initialContentRendered, contentImagesDownloadQueue, renderingDraft]);

    useEffect(() => {
        let video, videoElement;

        for (let i = 0; i < contentVideosDownloadQueue.length; i++) {
            video = contentVideosDownloadQueue[i];
            const videoId = video.id;
            videoElement = document.getElementById(videoId);

            if (video.status === "Downloading") {

            } else if ((video.status === "Downloaded") || (video.status === "DownloadedFromServiceWorker")) {
                let spinnerElement = document.getElementById('spinner_' + videoId);
                if (spinnerElement) spinnerElement.remove();
                if (!videoElement.classList.contains('fr-video')) {
                    const videoSpan = document.createElement('span');

                    videoSpan.className = 'fr-video';
                    videoSpan.classList.add('fr-draggable');

                    videoSpan.setAttribute('contenteditable', 'true');
                    videoSpan.setAttribute('draggable', 'true');

                    const newVideoElement = document.createElement('video');
                    newVideoElement.className = 'bSafesVideo';
                    newVideoElement.classList.add('fr-draggable');
                    newVideoElement.classList.add('fr-dvi');
                    newVideoElement.classList.add('fr-fvc');
                    newVideoElement.setAttribute('controls', '');
                    newVideoElement.innerHTML = 'Your browser does not support HTML5 video.';
                    newVideoElement.id = videoId;
                    newVideoElement.src = video.src;
                    newVideoElement.style = videoElement.style;

                    newVideoElement.addEventListener("loadeddata", (event) => {
                        newVideoElement.play();
                    });

                    if (videoElement.classList.contains('fr-dib')) videoSpan.classList.add('fr-dvb');
                    if (videoElement.classList.contains('fr-dii')) videoSpan.classList.add('fr-dvi');
                    if (videoElement.classList.contains('fr-fil')) videoSpan.classList.add('fr-fvl');
                    if (videoElement.classList.contains('fr-fic')) videoSpan.classList.add('fr-fvc');
                    if (videoElement.classList.contains('fr-fir')) videoSpan.classList.add('fr-fvr');

                    videoSpan.appendChild(newVideoElement);
                    videoElement.replaceWith(videoSpan);
                    dispatch(playingContentVideo({ itemId: pageItemId, indexInQueue: i }));
                }

            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [contentVideosDownloadQueue]);

    useEffect(() => {
        if (contentEditorMode === "ReadOnly") {
            debugLog(debugOn, "ReadOnly");
            afterContentReadOnly();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentEditorMode]);

    useEffect(() => {
        if (!draftLoaded) return;
        setRenderingDraft(true);
    }, [draftLoaded]);

    useEffect(() => {
        if (renderingDraft) {
            dispatch(startDownloadingContentImagesForDraftThunk());
        }
    }, [renderingDraft]);

    useEffect(() => {
        if (contentImagesAllDownloaded && draftLoaded) {
            handleWrite();
            setRenderingDraft(false);
        }
    }, [contentImagesAllDownloaded, draftLoaded]);

    useEffect(() => {
        if (draftLoaded && contentEditorContentWithImagesAndVideos && contentEditorContentWithImagesAndVideos !== contentEditorContent) {
            dispatch(setContentEditorMode("Writing"));
            setEditingEditorId("content");
        }
    }, [contentEditorContentWithImagesAndVideos])

    const photoSwipeGallery = () => {
        return (
            //<!-- Root element of PhotoSwipe. Must have class pswp. -->
            <div ref={pswpRef} className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
                {/*<!-- Background of PhotoSwipe. It's a separate element as animating opacity is faster than rgba(). -->*/}
                <div className="pswp__bg"></div>
                {/*<!-- Slides wrapper with overflow:hidden. -->*/}
                <div className="pswp__scroll-wrap">
                    {/*<!-- Container that holds slides. PhotoSwipe keeps only 3 of them in the DOM to save memory. Don't modify these 3 pswp__item elements, data is added later on. -->*/}
                    <div className="pswp__container">
                        <div className="pswp__item"></div>
                        <div className="pswp__item"></div>
                        <div className="pswp__item"></div>
                    </div>

                    {/*<!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->*/}
                    <div className="pswp__ui pswp__ui--hidden">
                        <div className="pswp__top-bar">
                            {/*<!--  Controls are self-explanatory. Order can be changed. -->*/}
                            <div className="pswp__counter"></div>
                            <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <button className="pswp__button pswp__button--share" title="Share"></button>
                            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                            {/*<!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->*/}
                            {/*<!-- element will get class pswp__preloader active when preloader is running -->*/}
                            <div className="pswp__preloader">
                                <div className="pswp__preloader__icn">
                                    <div className="pswp__preloader__cut">
                                        <div className="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div className="pswp__share-tooltip"></div>
                        </div>
                        <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                        </button>
                        <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                        </button>
                        <div className="pswp__caption">
                            <div className="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="pageCommons">
                {!(contentType === 'DrawingPage' && contentEditorMode === "Writing") &&
                    <>
                        {productId === "" ?
                            <Row className="justify-content-center">
                                <Col sm="10">
                                    <hr />
                                </Col>
                            </Row>
                            :
                            <hr className="my-0" />

                        }
                        {product.fixedSize ?
                            <div className={`${BSafesProductsStyle[`${productId}_RowXMargins`]} justify-content-center`}>
                                <Editor editorId="title" showWriteIcon={true} mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0) && (!oldVersion)} />
                            </div>
                            :
                            <Row className={`${BSafesProductsStyle[`${productId}_RowXMargins`]} justify-content-center`}>
                                <Col sm="10" >
                                    <Editor editorId="title" showWriteIcon={true} mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0) && (!oldVersion)} />
                                </Col>
                            </Row>
                        }
                        {productId === "" ?
                            <Row className="justify-content-center mx-2">
                                <Col sm="10">
                                    <hr />
                                </Col>
                            </Row>
                            :
                            <hr className="my-0 mx-2" />
                        }
                    </>
                }
                {contentType !== 'DrawingPage' ?
                    <Row className="justify-content-center">
                        <Col className={`contenEditorRow`} xs="12" sm="10" style={{ minHeight: "280px" }}>
                            <Editor editorId="content" showDrawIcon={!contentType || contentType === 'DrawingPage'} showWriteIcon={!contentType || contentType === 'WritingPage'} mode={contentEditorMode} content={contentEditorContentWithImagesAndVideos || contentEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0) && (!oldVersion) && contentImagesAllDisplayed} writingModeReady={handleContentWritingModeReady} readOnlyModeReady={handleContentReadOnlyModeReady} onDraftSampled={handleDraftSample} onDraftClicked={handleDraftClicked} onDraftDelete={handleDraftDelete} onDrawingClicked={handleDrawingClicked} drawingImageDone={handleDrawingImageDone} />
                        </Col>
                    </Row>
                    :
                    <>
                        <Editor editorId="content" showDrawIcon={!contentType || contentType === 'DrawingPage'} mode={contentEditorMode} content={contentEditorContentWithImagesAndVideos || contentEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0) && (!oldVersion) && contentImagesAllDisplayed} writingModeReady={handleContentWritingModeReady} readOnlyModeReady={handleContentReadOnlyModeReady} onDraftSampled={handleDraftSample} onDraftClicked={handleDraftClicked} onDraftDelete={handleDraftDelete} onDrawingClicked={handleDrawingClicked} drawingImageDone={handleDrawingImageDone} />
                    </>
                }
                <br />
                <br />
                <hr />
                {!turningPage && !(contentType === 'DrawingPage' && contentEditorMode === "Writing") &&
                    <div className={`${BSafesStyle.pageCommonsExtension}`}>
                        {(!abort && !editingEditorId && (activity === 0) && (!oldVersion)) &&
                            <div className="videos">
                                <input ref={videoFilesInputRef} onChange={handleVideoFiles} type="file" accept="video/*" multiple className="d-none editControl" id="videos" />
                                <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]}` : "row"}>
                                    <Col id="videos" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className={`text-center ${videosDragActive ? BSafesStyle.videosDragDropZoneActive : BSafesStyle.videosDragDropZone}`}>
                                        <Button id="videos" onClick={handleVideoButton} variant="link" className="text-dark btn btn-labeled">
                                            <h4><i id="videos" className="fa fa-video-camera fa-lg" aria-hidden="true"></i></h4>
                                        </Button>
                                    </Col>
                                </div>
                            </div>
                        }
                        <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]} justify-content-center` : "row justify-content-center"}>
                            <Col xs="12" md="8" >
                                {videoPanels}
                            </Col>
                        </div>
                        <br />
                        {(!abort && !editingEditorId && (activity === 0) && (!oldVersion)) &&
                            <div className="images">
                                <input ref={imageFilesInputRef} onChange={handleImageFiles} type="file" multiple accept="image/*" className="d-none editControl" id="images" />
                                <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]}` : "row"}>
                                    <Col id="images" onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className={`text-center ${imagesDragActive ? BSafesStyle.imagesDragDropZoneActive : BSafesStyle.imagesDragDropZone}`}>
                                        <Button id="images" onClick={handleImageButton} variant="link" className="text-dark btn btn-labeled">
                                            <h4><i id="images" className="fa fa-picture-o fa-lg" aria-hidden="true"></i></h4>
                                        </Button>
                                    </Col>
                                </div>
                            </div>
                        }
                        <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]} justify-content-center` : "row justify-content-center"}>
                            <Col xs="12" sm="10" lg="8" >
                                {imagePanels}
                            </Col>
                        </div>
                        <br />
                        {(!abort && !editingEditorId && (activity === 0) && (!oldVersion)) &&
                            <div className="audios">
                                <input ref={audioFilesInputRef} onChange={handleAudioFiles} type="file" accept="audio/mp3, audio/wav" multiple className="d-none editControl" id="audios" />
                                <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]}` : "row"}>
                                    <Col id="audios" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className={`text-center ${videosDragActive ? BSafesStyle.audiosDragDropZoneActive : BSafesStyle.audiosDragDropZone}`}>
                                        <Button id="audios" onClick={handleAudioButton} variant="link" className="text-dark btn btn-labeled">
                                            <h4><i id="audios" className="fa fa-volume-up fa-lg" aria-hidden="true"></i></h4>
                                        </Button>
                                    </Col>
                                </div>
                            </div>
                        }
                        <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]} justify-content-center` : "row justify-content-center"}>
                            <Col xs="12" md="8" >
                                {audioPanels}
                            </Col>
                        </div>
                        <br />
                        {(!abort && !editingEditorId && (activity === 0) && (!oldVersion)) &&
                            <div className="attachments">
                                <input ref={attachmentsInputRef} onChange={handleAttachments} type="file" multiple className="d-none editControl" id="attachments" />
                                <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]}` : "row"}>
                                    <Col id="attachments" onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className={`text-center ${attachmentsDragActive ? BSafesStyle.attachmentsDragDropZoneActive : BSafesStyle.attachmentsDragDropZone}`}>
                                        <Button id="attachments" onClick={handleAttachmentButton} variant="link" className="text-dark btn btn-labeled">
                                            <h4><i id="attachments" className="fa fa-paperclip fa-lg" aria-hidden="true"></i></h4>
                                        </Button>
                                    </Col>
                                </div>
                            </div>
                        }
                        <div className={product.fixedSize ? `${BSafesProductsStyle[`${productId}_RowXMargins`]} justify-content-center` : "row justify-content-center"}>
                            <Col xs="12" md="8" >
                                {attachmentPanels}
                            </Col>
                        </div>
                        <br />
                        {photoSwipeGallery()}
                    </div>}
                {false && itemCopy && <Comments handleContentChanged={handleContentChanged} handlePenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0) && (!oldVersion)} />}
                {true &&
                    <PageCommonControls isEditing={editingEditorId} onWrite={handleWrite} readyForSaving={(S3SignedUrlForContentUpload !== null) || readyForSaving} onSave={handleSave} onCancel={handleCancel} canEdit={(!editingEditorId && (activity === 0) && (!oldVersion) && contentImagesAllDisplayed)} />
                }
                {!contentImagesAllDisplayed &&
                    <div className='fixed-bottom'>
                        <Alert variant='info'>
                            Loading contents, please wait ...
                        </Alert>
                    </div>
                }
                <div ref={spinnerRef} className='bsafesMediaSpinner' hidden>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                </div>
            </div>
        </>
    )
}