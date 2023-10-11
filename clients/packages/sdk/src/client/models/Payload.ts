/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 *  Welcome to the **Polar API** for [polar.sh](https://polar.sh).  The Public API is currently a [work in progress](https://github.com/polarsource/polar/issues/834) and is in active development. 🚀  #### Authentication  Use a [Personal Access Token](https://polar.sh/settings) and send it in the `Authorization` header on the format `Bearer [YOUR_TOKEN]`.  #### Feedback  If you have any feedback or comments, reach out in the [Polar API-issue](https://github.com/polarsource/polar/issues/834), or reach out on the Polar Discord server.  We\'d love to see what you\'ve built with the API and to get your thoughts on how we can make the API better!  #### Connecting  The Polar API is online at `https://api.polar.sh`. 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ExternalGitHubCommitReference } from './ExternalGitHubCommitReference';
import {
    ExternalGitHubCommitReferenceFromJSON,
    ExternalGitHubCommitReferenceFromJSONTyped,
    ExternalGitHubCommitReferenceToJSON,
} from './ExternalGitHubCommitReference';
import type { ExternalGitHubPullRequestReference } from './ExternalGitHubPullRequestReference';
import {
    ExternalGitHubPullRequestReferenceFromJSON,
    ExternalGitHubPullRequestReferenceFromJSONTyped,
    ExternalGitHubPullRequestReferenceToJSON,
} from './ExternalGitHubPullRequestReference';
import type { PullRequestReference } from './PullRequestReference';
import {
    PullRequestReferenceFromJSON,
    PullRequestReferenceFromJSONTyped,
    PullRequestReferenceToJSON,
} from './PullRequestReference';

/**
 * 
 * @export
 * @interface Payload
 */
export interface Payload {
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    author_login: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    author_avatar: string;
    /**
     * 
     * @type {number}
     * @memberof Payload
     */
    number: number;
    /**
     * 
     * @type {number}
     * @memberof Payload
     */
    additions: number;
    /**
     * 
     * @type {number}
     * @memberof Payload
     */
    deletions: number;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    state: string;
    /**
     * 
     * @type {Date}
     * @memberof Payload
     */
    created_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof Payload
     */
    merged_at?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Payload
     */
    closed_at?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof Payload
     */
    is_draft: boolean;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    organization_name: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    repository_name: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    sha: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    branch_name?: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    message?: string;
}

/**
 * Check if a given object implements the Payload interface.
 */
export function instanceOfPayload(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "author_login" in value;
    isInstance = isInstance && "author_avatar" in value;
    isInstance = isInstance && "number" in value;
    isInstance = isInstance && "additions" in value;
    isInstance = isInstance && "deletions" in value;
    isInstance = isInstance && "state" in value;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "is_draft" in value;
    isInstance = isInstance && "organization_name" in value;
    isInstance = isInstance && "repository_name" in value;
    isInstance = isInstance && "sha" in value;

    return isInstance;
}

export function PayloadFromJSON(json: any): Payload {
    return PayloadFromJSONTyped(json, false);
}

export function PayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): Payload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'author_login': json['author_login'],
        'author_avatar': json['author_avatar'],
        'number': json['number'],
        'additions': json['additions'],
        'deletions': json['deletions'],
        'state': json['state'],
        'created_at': (new Date(json['created_at'])),
        'merged_at': !exists(json, 'merged_at') ? undefined : (new Date(json['merged_at'])),
        'closed_at': !exists(json, 'closed_at') ? undefined : (new Date(json['closed_at'])),
        'is_draft': json['is_draft'],
        'organization_name': json['organization_name'],
        'repository_name': json['repository_name'],
        'sha': json['sha'],
        'branch_name': !exists(json, 'branch_name') ? undefined : json['branch_name'],
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function PayloadToJSON(value?: Payload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'author_login': value.author_login,
        'author_avatar': value.author_avatar,
        'number': value.number,
        'additions': value.additions,
        'deletions': value.deletions,
        'state': value.state,
        'created_at': (value.created_at.toISOString()),
        'merged_at': value.merged_at === undefined ? undefined : (value.merged_at.toISOString()),
        'closed_at': value.closed_at === undefined ? undefined : (value.closed_at.toISOString()),
        'is_draft': value.is_draft,
        'organization_name': value.organization_name,
        'repository_name': value.repository_name,
        'sha': value.sha,
        'branch_name': value.branch_name,
        'message': value.message,
    };
}
