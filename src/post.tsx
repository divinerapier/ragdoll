import * as React from 'react';
import { Switch, RouteComponentProps, Route, BrowserRouter, Link } from 'react-router-dom';
import Axios from 'axios';

export interface PostAbstractProps {
    id: number,
    title: string,
    link_name: string,
}

export interface PostProps {
    link_name: string,
}

export const PostAbstract = (props: { id: number, title: string, link_name: string }) => {
    const href = "/post/" + props.link_name;
    return (
        <BrowserRouter>
            <div>
                <div>
                    <Link to={href} target={href} >{props.title}</Link>
                </div>
            </div>
        </BrowserRouter>
    )
};

export interface Post {
    id: number,
    uuid: string,
    title: string,
    link_name: string,
    content?: string,
}

export interface PostListDataProps {
    posts: Array<Post>,
}
export const PostListData = (props: { posts: Post[] }) => {
    const list = props.posts.map((post, index) => {
        return <PostAbstract id={post.id} title={post.title} link_name={post.link_name}></PostAbstract>
    })
    return (
        <div>{list}</div>
    )
};

export interface PostListProps {
    offset: number,
    limit: number,
}

export interface PostListState {
    posts?: Array<Post>,
    finished: Boolean,
    failed: Boolean,
    error?: any,
}

export class PostListComponent extends React.Component<PostListProps, PostListState> {
    componentDidMount() {
        // const { offset, limit } = this.props;
        this.setState({ finished: false, failed: false });
        const offset = 0;
        const limit = 20;
        Axios.get<Array<Post>>("http://127.0.0.1:8080/posts?" + `offset=${offset}&limit=${limit}`, {
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            // },
        }).then((response) => {
            const { data } = response;
            console.log("data => ", data);
            this.setState({ posts: data, finished: true, failed: false });
        }).catch((e) => {
            console.log("error => ", e);
            this.setState({ finished: false, failed: true, error: e })
        });
    }

    render() {
        if ((this.state == null) || (!this.state.failed && !this.state.finished)) {
            return (
                <div>Loading</div>
            )
        }
        if (this.state.failed) {
            return (<div>{this.state.error}</div>)
        }
        const posts = this.state.posts == undefined ? [] : this.state.posts;

        return (
            <PostListData posts={posts}></PostListData>
        )
    }
};

export const PostComponent = (params: RouteComponentProps<PostProps>) => {
    const link_name = params.match.params.link_name;

    return (
        <div>
            <h1>{link_name}</h1>
        </div>
    )
};