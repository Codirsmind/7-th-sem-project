import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const VideoInteractions = ({ contentId }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const auth = getAuth();

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/interactions/${contentId}`
                );

                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);

                const currentUser = auth.currentUser;

                if (currentUser) {
                    setLiked(
                        response.data.likedBy.includes(
                            currentUser.uid
                        )
                    );

                    setDisliked(
                        response.data.dislikedBy.includes(
                            currentUser.uid
                        )
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to fetch interactions:",
                    error
                );
            }
        };

        if (contentId) {
            fetchInteractions();
        }
    }, [contentId]);

    const handleLike = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert("Please login to like this movie.");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/interactions/${contentId}/like`,
                {
                    userId: currentUser.uid
                }
            );

            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);

            setLiked(response.data.liked);
            setDisliked(false);
        } catch (error) {
            console.error(
                "Like error:",
                error
            );
        }
    };

    const handleDislike = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert("Please login to dislike this movie.");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/interactions/${contentId}/dislike`,
                {
                    userId: currentUser.uid
                }
            );

            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);

            setDisliked(response.data.disliked);
            setLiked(false);
        } catch (error) {
            console.error(
                "Dislike error:",
                error
            );
        }
    };

    return (
        <div className="video-interactions">

            <button
                onClick={handleLike}
                className={liked ? "active" : ""}
            >
                👍
                <span>Like</span>
                <span>{likes}</span>
            </button>

            <button
                onClick={handleDislike}
                className={disliked ? "active" : ""}
            >
                👎
                <span>Dislike</span>
                <span>{dislikes}</span>
            </button>

        </div>
    );
};

export default VideoInteractions;