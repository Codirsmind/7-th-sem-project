import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BiLike, BiDislike } from "react-icons/bi";
import { firebaseAuth } from "../Utils/firebase-config";

const VideoInteractions = ({ contentId }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInteractions = async () => {
            if (!contentId) return;

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/interactions/${contentId}`
                );

                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);

                const user = firebaseAuth.currentUser;

                if (user) {
                    setLiked(
                        response.data.likedBy.includes(user.uid)
                    );

                    setDisliked(
                        response.data.dislikedBy.includes(user.uid)
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to fetch interactions:",
                    error
                );
            }
        };

        fetchInteractions();
    }, [contentId]);

    const handleLike = async () => {
        const user = firebaseAuth.currentUser;

        if (!user) {
            alert("Please login to like this movie.");
            return;
        }

        if (loading) return;

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/interactions/${contentId}/like`,
                {
                    userId: user.uid
                }
            );

            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);
            setLiked(response.data.liked);
            setDisliked(false);

        } catch (error) {
            console.error("Like error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDislike = async () => {
        const user = firebaseAuth.currentUser;

        if (!user) {
            alert("Please login to dislike this movie.");
            return;
        }

        if (loading) return;

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/interactions/${contentId}/dislike`,
                {
                    userId: user.uid
                }
            );

            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);
            setDisliked(response.data.disliked);
            setLiked(false);

        } catch (error) {
            console.error("Dislike error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <InteractionGroup>

                <InteractionButton
                    type="button"
                    onClick={handleLike}
                    $active={liked}
                    disabled={loading}
                >
                    <BiLike />

                    <span>
                        {likes}
                    </span>
                </InteractionButton>

                <Divider />

                <InteractionButton
                    type="button"
                    onClick={handleDislike}
                    $active={disliked}
                    disabled={loading}
                >
                    <BiDislike />

                    <span>
                        {dislikes}
                    </span>
                </InteractionButton>

            </InteractionGroup>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;

    display: flex;
    align-items: center;

    margin: 1.5rem 0 0;
    padding: 0;

    box-sizing: border-box;
`;

const InteractionGroup = styled.div`
    display: inline-flex;
    align-items: center;

    height: 44px;

    padding: 0 6px;

    border: 1px solid #292929;
    border-radius: 22px;

    background: #141414;

    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.25);

    @media (max-width: 520px) {
        height: 40px;
        padding: 0 4px;
    }
`;

const InteractionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 8px;

    height: 34px;

    padding: 0 13px;

    border: none;
    border-radius: 17px;

    background: transparent;

    color: ${({ $active }) =>
        $active ? "#ffffff" : "#9a9a9a"};

    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;

    cursor: pointer;

    transition:
        background 0.2s ease,
        color 0.2s ease,
        transform 0.15s ease;

    svg {
        width: 19px;
        height: 19px;

        flex-shrink: 0;

        transition:
            transform 0.2s ease,
            color 0.2s ease;
    }

    span {
        min-width: 12px;

        font-size: 0.85rem;
        font-weight: 600;

        line-height: 1;
    }

    &:hover:not(:disabled) {
        background: #252525;
        color: #ffffff;
    }

    &:hover:not(:disabled) svg {
        transform: scale(1.08);
    }

    &:active:not(:disabled) {
        transform: scale(0.96);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 520px) {
        gap: 6px;

        height: 30px;

        padding: 0 10px;

        font-size: 0.82rem;

        svg {
            width: 17px;
            height: 17px;
        }

        span {
            font-size: 0.78rem;
        }
    }
`;

const Divider = styled.div`
    width: 1px;
    height: 22px;

    margin: 0 3px;

    background: #353535;

    @media (max-width: 520px) {
        height: 19px;
        margin: 0 2px;
    }
`;

export default VideoInteractions;