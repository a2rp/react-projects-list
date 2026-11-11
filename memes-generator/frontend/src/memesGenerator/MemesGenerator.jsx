import React, { useState } from "react"
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";

const MemesGenerator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [memes, setMemes] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const options = {
                url: "https://api.imgflip.com/get_memes",
                method: "GET"
            };
            setIsLoading(true);
            setMemes(null);
            const response = await axios(options);
            const templates = response.data?.data?.memes;
            if (response.data?.success !== true || !Array.isArray(templates)) {
                throw new Error(response.data?.error_message || "The meme service returned an invalid response.");
            }
            setMemes(templates);
        } catch (error) {
            toast.error(error.message || "Unable to load meme templates.");
        } finally {
            setIsLoading(false);
        }
    };

    const saveImage = async (canvas, imageNumber) => {
        if (!canvas) {
            toast.error("Unable to save this meme");
            return;
        }

        try {
            await canvas.querySelector("img")?.decode();
            const dataUrl = await toPng(canvas, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement("a");
            link.download = `meme-${imageNumber + 1}.png`;
            link.href = dataUrl;
            document.body.append(link);
            link.click();
            link.remove();
        } catch {
            toast.error("Unable to save this meme");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.topSection}>
                    <div className={styles.heading}>Memes Generator</div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            value={topText}
                            onChange={event => setTopText(event.target.value)}
                            label="Top text"
                            placeholder="Write top text here"
                            fullWidth
                            className={styles.topText}
                        />
                        <TextField
                            value={bottomText}
                            onChange={event => setBottomText(event.target.value)}
                            label="Bottom text"
                            placeholder="Write bottom text here"
                            fullWidth
                            className={styles.bottomText}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                            className={styles.submitButton}
                            fullWidth
                        >{isLoading
                            ? <CircularProgress sx={{ padding: "10px" }} />
                            : "Get meme images"}</Button>
                    </form>
                </div>

                <div className={styles.outputContainer}>
                    {memes != null
                        && <>
                            {memes.length === 0 && <p>No meme templates are available right now.</p>}
                            {memes.map((item, index) => (
                                <div key={item.id} className={styles.memesContainer}>
                                    <div className={styles.memeCanvas} data-meme-canvas>
                                        <img src={item.url} className={styles.memeImage} alt={item.name} crossOrigin="anonymous" loading="lazy" />
                                        <div className={styles.memeTopText}>{topText}</div>
                                        <div className={styles.memeBottomText}>{bottomText}</div>
                                    </div>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={event => saveImage(event.currentTarget.parentElement?.querySelector("[data-meme-canvas]"), index)}
                                        className={styles.saveButton}
                                    >Save</Button>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MemesGenerator

